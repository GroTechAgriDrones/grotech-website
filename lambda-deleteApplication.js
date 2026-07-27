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
        if (event.httpMethod === 'OPTIONS') {
            return { statusCode: 200, headers, body: '' };
        }

        const appId = event.pathParameters?.id;
        console.log('Delete request for appId:', appId);
        
        if (!appId) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Application ID is required' })
            };
        }

        const listCommand = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: 'applications/'
        });

        const listResponse = await s3.send(listCommand);
        const files = listResponse.Contents || [];
        console.log('Found files:', files.map(f => f.Key));

        let fileToDelete = null;
        
        for (const file of files) {
            console.log('Processing file:', file.Key);
            
            const getObjectCommand = new GetObjectCommand({
                Bucket: BUCKET_NAME,
                Key: file.Key
            });
            
            const getResponse = await s3.send(getObjectCommand);
            const body = await getResponse.Body.transformToString();
            
            console.log('File:', file.Key, 'Body length:', body?.length, 'Body preview:', body?.substring(0, 100));
            
            if (!body || body.trim() === '') {
                console.log('Skipping empty file:', file.Key);
                continue;
            }
            
            const data = JSON.parse(body);
            console.log('Parsed data.id:', data.id, 'Looking for:', appId);
            
            if (data.id === appId) {
                fileToDelete = file.Key;
                console.log('Found file to delete:', fileToDelete);
                break;
            }
        }

        if (!fileToDelete) {
            console.log('No file found for appId:', appId);
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Application not found' })
            };
        }

        const deleteCommand = new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: fileToDelete
        });

        await s3.send(deleteCommand);
        console.log('Successfully deleted:', fileToDelete);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                message: 'Application deleted successfully',
                id: appId
            })
        };

    } catch (error) {
        console.error('Full error:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
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
