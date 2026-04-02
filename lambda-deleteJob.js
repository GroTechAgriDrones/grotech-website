import { S3Client, DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-2' });
const BUCKET_NAME = 'grotech-website-files';
const JOBS_PREFIX = 'jobs/';

export const handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'DELETE, OPTIONS'
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

        // Find the job file in S3
        const listCommand = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: JOBS_PREFIX
        });

        const listResponse = await s3.send(listCommand);
        const files = listResponse.Contents || [];

        // Find the file containing this job ID
        let jobFileKey = null;

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
                    break;
                }
            }
        }

        if (!jobFileKey) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Job not found' })
            };
        }

        // Delete the job file
        const deleteCommand = new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: jobFileKey
        });

        await s3.send(deleteCommand);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Job deleted successfully' })
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
