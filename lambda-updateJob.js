import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-2' });
const BUCKET_NAME = 'grotech-website-files';

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

        const jobKey = `jobs/${jobId}.json`;
        let jobData;
        try {
            const getCommand = new GetObjectCommand({
                Bucket: BUCKET_NAME,
                Key: jobKey
            });
            const getResponse = await s3.send(getCommand);
            const body = await getResponse.Body.transformToString();
            jobData = JSON.parse(body);
        } catch (err) {
            if (err.name === 'NoSuchKey') {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ error: 'Job not found' })
                };
            }
            throw err;
        }

        // Conflict detection: if the client reports the version it loaded (_baseUpdatedAt)
        // and it differs from the stored version, the job was changed on another device.
        // Reject the write so stale data can't overwrite newer changes.
        const baseUpdatedAt = updateData._baseUpdatedAt;
        delete updateData._baseUpdatedAt;
        if (jobData.updatedAt && baseUpdatedAt !== jobData.updatedAt) {
            return {
                statusCode: 409,
                headers,
                body: JSON.stringify({
                    error: 'Job was changed on another device',
                    job: jobData,
                    updatedAt: jobData.updatedAt
                })
            };
        }

        // Update the job data
        const updatedJob = {
            ...jobData,
            ...updateData,
            id: jobId, // Ensure ID doesn't change
            updatedAt: new Date().toISOString()
        };

        // Save updated job
        const putCommand = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: jobKey,
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
