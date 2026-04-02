import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-2' });
const BUCKET_NAME = 'grotech-website-files';
const JOBS_PREFIX = 'jobs/';

export const handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'PUT, OPTIONS'
    };

    try {
        if (event.httpMethod === 'OPTIONS') {
            return { statusCode: 200, headers, body: '' };
        }

        // Get job ID from path
        const jobId = event.pathParameters?.id;
        if (!jobId) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Job ID required' })
            };
        }

        const updateData = JSON.parse(event.body);

        // Find the job file in S3
        const listCommand = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: JOBS_PREFIX
        });

        const listResponse = await s3.send(listCommand);
        const files = listResponse.Contents || [];

        // Find the file containing this job ID
        let jobFileKey = null;
        let jobData = null;

        for (const file of files) {
            if (file.Key.endsWith('.json')) {
                const getCommand = new GetObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: file.Key
                });
                const getResponse = await s3.send(getCommand);
                const body = await getResponse.Body.transformToString();
                const data = JSON.parse(body);

                if (data.id === jobId) {
                    jobFileKey = file.Key;
                    jobData = data;
                    break;
                }
            }
        }

        if (!jobFileKey || !jobData) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Job not found' })
            };
        }

        // Update the job data
        const updatedJob = {
            ...jobData,
            ...updateData,
            id: jobId // Ensure ID doesn't change
        };

        // Save updated job
        const putCommand = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: jobFileKey,
            Body: JSON.stringify(updatedJob, null, 2),
            ContentType: 'application/json'
        });

        await s3.send(putCommand);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Job updated', job: updatedJob })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};
