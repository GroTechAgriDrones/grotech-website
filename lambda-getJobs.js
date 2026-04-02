import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-2' });
const BUCKET_NAME = 'grotech-website-files';
const JOBS_PREFIX = 'jobs/';

export const handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
    };

    try {
        if (event.httpMethod === 'OPTIONS') {
            return { statusCode: 200, headers, body: '' };
        }

        // List all files in jobs/ folder
        const listCommand = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: JOBS_PREFIX
        });

        const listResponse = await s3.send(listCommand);
        const files = listResponse.Contents || [];

        // Read each job file
        const jobs = [];
        for (const file of files) {
            if (file.Key.endsWith('.json')) {
                const getCommand = new GetObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: file.Key
                });
                const getResponse = await s3.send(getCommand);
                const body = await getResponse.Body.transformToString();
                const jobData = JSON.parse(body);
                jobs.push(jobData);
            }
        }

        // Sort by date requested (newest first)
        jobs.sort((a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted));

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ jobs })
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
