import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({});

export const handler = async (event) => {
    try {
        const listResponse = await s3.send(new ListObjectsV2Command({
            Bucket: 'grotech-website-files',
            Prefix: 'applications/'
        }));
        
        if (!listResponse.Contents || listResponse.Contents.length === 0) {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS'
                },
                body: JSON.stringify([])
            };
        }
        
        const applications = [];
        for (const item of listResponse.Contents) {
            if (!item.Key.endsWith('.json')) continue;
            
            try {
                const getResponse = await s3.send(new GetObjectCommand({
                    Bucket: 'grotech-website-files',
                    Key: item.Key
                }));
                
                const str = await getResponse.Body.transformToString();
                applications.push(JSON.parse(str));
            } catch (e) {
                console.log('Error reading file:', item.Key, e.message);
            }
        }
        
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, OPTIONS'
            },
            body: JSON.stringify(applications)
        };
    } catch (error) {
        console.log('Main error:', error.message);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, OPTIONS'
            },
            body: JSON.stringify({ error: error.message })
        };
    }
};
