import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-2' });
const BUCKET_NAME = 'grotech-website-files';

export const handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
    };

    try {
        // Handle OPTIONS request for CORS
        if (event.httpMethod === 'OPTIONS') {
            return {
                statusCode: 200,
                headers,
                body: ''
            };
        }

        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: 'chemical-info.json'
        });

        const response = await s3.send(command);
        const body = await response.Body.transformToString();
        const chemicalData = JSON.parse(body);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(chemicalData)
        };

    } catch (error) {
        console.error('Error fetching chemical info:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Failed to fetch chemical information',
                message: error.message 
            })
        };
    }
};
