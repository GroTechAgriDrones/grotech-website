import { S3Client, DeleteObjectCommand, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-2' });
const BUCKET_NAME = 'grotech-website-files';

export const handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'DELETE, OPTIONS'
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

        // Get application ID from path parameters
        const appId = event.pathParameters?.id;
        
        if (!appId) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Application ID is required' })
            };
        }

        // First, find the file with this application ID
        const listCommand = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: 'applications/'
        });

        const listResponse = await s3.send(listCommand);
        const files = listResponse.Contents || [];

        // Find the file that contains this application ID
        let fileToDelete = null;
        
        for (const file of files) {
            const getObjectCommand = new GetObjectCommand({
                Bucket: BUCKET_NAME,
                Key: file.Key
            });
            
            const getResponse = await s3.send(getObjectCommand);
            const body = await getResponse.Body.transformToString();
            const data = JSON.parse(body);
            
            if (data.id === appId) {
                fileToDelete = file.Key;
                break;
            }
        }

        if (!fileToDelete) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Application not found' })
            };
        }

        // Delete the file
        const deleteCommand = new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: fileToDelete
        });

        await s3.send(deleteCommand);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                message: 'Application deleted successfully',
                id: appId
            })
        };

    } catch (error) {
        console.error('Error deleting application:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Failed to delete application',
                message: error.message 
            })
        };
    }
};
