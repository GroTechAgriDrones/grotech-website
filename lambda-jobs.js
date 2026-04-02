import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-2' });
const BUCKET_NAME = 'grotech-website-files';
const JOBS_PREFIX = 'jobs/';
const JOBS_FILE = 'jobs.json';

// Helper to get jobs
async function getJobs() {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: JOBS_FILE
        });
        const response = await s3.send(command);
        const body = await response.Body.transformToString();
        const data = JSON.parse(body);
        return data.jobs || [];
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
    }
}

// Helper to save jobs
async function saveJobs(jobs) {
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: JOBS_FILE,
        Body: JSON.stringify({ jobs }, null, 2),
        ContentType: 'application/json'
    });
    await s3.send(command);
}

export const handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    };

    try {
        // Handle OPTIONS
        if (event.httpMethod === 'OPTIONS') {
            return { statusCode: 200, headers, body: '' };
        }

        // GET - List all jobs
        if (event.httpMethod === 'GET') {
            const jobs = await getJobs();
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ jobs })
            };
        }

        // POST - Create new job
        if (event.httpMethod === 'POST') {
            const jobData = JSON.parse(event.body);
            const jobs = await getJobs();
            
            // Check if job already exists
            if (jobs.find(j => j.id === jobData.id)) {
                return {
                    statusCode: 409,
                    headers,
                    body: JSON.stringify({ error: 'Job already exists' })
                };
            }
            
            jobs.push(jobData);
            await saveJobs(jobs);
            
            return {
                statusCode: 201,
                headers,
                body: JSON.stringify({ message: 'Job created', job: jobData })
            };
        }

        // PUT - Update job
        if (event.httpMethod === 'PUT') {
            const jobId = event.pathParameters?.id;
            const updateData = JSON.parse(event.body);
            
            if (!jobId) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Job ID required' })
                };
            }
            
            const jobs = await getJobs();
            const jobIndex = jobs.findIndex(j => j.id === jobId);
            
            if (jobIndex === -1) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ error: 'Job not found' })
                };
            }
            
            // Update job
            jobs[jobIndex] = {
                ...jobs[jobIndex],
                ...updateData
            };
            
            await saveJobs(jobs);
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: 'Job updated', job: jobs[jobIndex] })
            };
        }

        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
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
