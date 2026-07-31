import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({ region: 'us-east-2' });
const BUCKET_NAME = 'grotech-website-files';
const PHOTOS_PREFIX = 'job-photos/';

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS'
};

export const handler = async (event) => {
    try {
        if (event.httpMethod === 'OPTIONS') {
            return { statusCode: 200, headers, body: '' };
        }

        if (event.httpMethod === 'POST') {
            const body = JSON.parse(event.body || '{}');
            const { jobId, fieldIndex, fileName, fileType, thumb } = body;

            if (!jobId || fieldIndex === undefined || fieldIndex === null || !fileName || !fileType) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'jobId, fieldIndex, fileName and fileType are required' })
                };
            }

            if (!fileType.startsWith('image/')) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Only image files are allowed' })
                };
            }

            const cleanJobId = String(jobId).replace(/[^a-zA-Z0-9-_]/g, '');
            const cleanFieldIndex = parseInt(fieldIndex, 10);
            let key;
            let contentType = fileType;
            if (thumb) {
                key = `${PHOTOS_PREFIX}${cleanJobId}/field-${cleanFieldIndex}-thumb.jpg`;
                contentType = 'image/jpeg';
            } else {
                const ext = (fileName.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
                key = `${PHOTOS_PREFIX}${cleanJobId}/field-${cleanFieldIndex}.${ext}`;
            }

            const putCommand = new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: key,
                ContentType: contentType
            });
            const uploadUrl = await getSignedUrl(s3, putCommand, { expiresIn: 900 });

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ key, uploadUrl, expiresIn: 900 })
            };
        }

        if (event.httpMethod === 'GET') {
            const key = event.queryStringParameters?.key;

            if (!key || !key.startsWith(PHOTOS_PREFIX)) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Valid photo key is required' })
                };
            }

            const downloadCommand = new GetObjectCommand({
                Bucket: BUCKET_NAME,
                Key: key
            });
            const downloadUrl = await getSignedUrl(s3, downloadCommand, { expiresIn: 3600 });

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ key, downloadUrl, expiresIn: 3600 })
            };
        }

        if (event.httpMethod === 'DELETE') {
            const key = event.queryStringParameters?.key;

            if (!key || !key.startsWith(PHOTOS_PREFIX)) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Valid photo key is required' })
                };
            }

            await s3.send(new DeleteObjectCommand({
                Bucket: BUCKET_NAME,
                Key: key
            }));

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ deleted: true })
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
