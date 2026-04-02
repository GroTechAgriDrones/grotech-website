import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-2' });
const BUCKET_NAME = 'grotech-website-files';
const APPS_PREFIX = 'applications/';

// Generate next available application ID
async function getNextAppId() {
    const listCommand = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: APPS_PREFIX
    });

    const listResponse = await s3.send(listCommand);
    const files = listResponse.Contents || [];

    // Find all existing application IDs
    const existingIds = new Set();
    
    for (const file of files) {
        if (file.Key.endsWith('.json')) {
            try {
                const getCommand = new GetObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: file.Key
                });
                const getResponse = await s3.send(getCommand);
                const body = await getResponse.Body.transformToString();
                const data = JSON.parse(body);
                
                if (data.id && data.id.startsWith('APP-')) {
                    // Extract the number from APP-XXX
                    const match = data.id.match(/^APP-(\d+)$/);
                    if (match) {
                        existingIds.add(parseInt(match[1], 10));
                    }
                }
            } catch (error) {
                console.log(`Error reading file ${file.Key}:`, error.message);
            }
        }
    }

    // Find next available ID
    let nextNum = 1;
    while (existingIds.has(nextNum)) {
        nextNum++;
    }

    return `APP-${String(nextNum).padStart(3, '0')}`;
}

export const handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    try {
        if (event.httpMethod === 'OPTIONS') {
            return { statusCode: 200, headers, body: '' };
        }

        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                headers,
                body: JSON.stringify({ error: 'Method not allowed' })
            };
        }

        const appData = JSON.parse(event.body);
        
        // Generate unique application ID
        const appId = await getNextAppId();
        console.log(`Generated new application ID: ${appId}`);

        // Add metadata to application
        const newApp = {
            ...appData,
            id: appId,
            status: 'pending',
            dateSubmitted: new Date().toISOString()
        };

        // Save application to S3
        const putCommand = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: `${APPS_PREFIX}${appId}.json`,
            Body: JSON.stringify(newApp, null, 2),
            ContentType: 'application/json'
        });

        await s3.send(putCommand);
        console.log(`Application saved: ${APPS_PREFIX}${appId}.json`);

        return {
            statusCode: 201,
            headers,
            body: JSON.stringify({ 
                message: 'Application submitted successfully', 
                application: newApp 
            })
        };

    } catch (error) {
        console.error('Error creating application:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};
