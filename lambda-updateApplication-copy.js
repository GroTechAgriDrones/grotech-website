// This is the updateApplication Lambda with job copying feature
// Update your existing updateApplication Lambda in AWS Console with this code

import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

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

        const appId = event.pathParameters?.id;
        if (!appId) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Application ID required' })
            };
        }

        const updateData = JSON.parse(event.body);

        // Find the application file in S3
        const listCommand = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: 'applications/'
        });

        const listResponse = await s3.send(listCommand);
        const files = listResponse.Contents || [];

        let appFileKey = null;
        let appData = null;

        for (const file of files) {
            if (file.Key.endsWith('.json')) {
                const getCommand = new GetObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: file.Key
                });
                const getResponse = await s3.send(getCommand);
                const body = await getResponse.Body.transformToString();
                const data = JSON.parse(body);

                if (data.id === appId) {
                    appFileKey = file.Key;
                    appData = data;
                    break;
                }
            }
        }

        if (!appFileKey || !appData) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Application not found' })
            };
        }

        // Update the application
        const updatedApp = {
            ...appData,
            ...updateData,
            id: appId
        };

        // Save updated application
        const putCommand = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: appFileKey,
            Body: JSON.stringify(updatedApp, null, 2),
            ContentType: 'application/json'
        });

        await s3.send(putCommand);

        // If status is 'approved', copy to jobs folder
        if (updateData.status === 'approved') {
            const jobKey = `jobs/${appId}.json`;
            
            const jobData = {
                ...updatedApp,
                jobStatus: 'pending',
                scheduledDate: null,
                scheduledTime: null,
                notes: '',
                dateCreated: new Date().toISOString()
            };
            
            const jobPutCommand = new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: jobKey,
                Body: JSON.stringify(jobData, null, 2),
                ContentType: 'application/json'
            });
            
            await s3.send(jobPutCommand);
            console.log(`Job created: ${jobKey}`);
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Application updated', application: updatedApp })
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
