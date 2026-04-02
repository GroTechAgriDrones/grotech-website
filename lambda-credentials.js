import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-2' });
const BUCKET_NAME = 'grotech-website-files';
const FILE_KEY = 'credentials.json';

export const handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS'
    };

    try {
        // Handle OPTIONS request for CORS
        if (event.httpMethod === 'OPTIONS') {
            return { statusCode: 200, headers, body: '' };
        }

        // GET - Return credentials (without password for security)
        if (event.httpMethod === 'GET') {
            const command = new GetObjectCommand({
                Bucket: BUCKET_NAME,
                Key: FILE_KEY
            });

            const response = await s3.send(command);
            const body = await response.Body.transformToString();
            const creds = JSON.parse(body);

            // Return without password
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    name: creds.name,
                    email: creds.email,
                    role: creds.role,
                    lastPasswordChange: creds.lastPasswordChange
                })
            };
        }

        // PUT - Update password (requires current password verification)
        if (event.httpMethod === 'PUT') {
            const data = JSON.parse(event.body);

            // Get current credentials
            const getCommand = new GetObjectCommand({
                Bucket: BUCKET_NAME,
                Key: FILE_KEY
            });

            const getResponse = await s3.send(getCommand);
            const currentBody = await getResponse.Body.transformToString();
            const currentCreds = JSON.parse(currentBody);

            // Verify current password
            if (data.currentPassword !== currentCreds.password) {
                return {
                    statusCode: 401,
                    headers,
                    body: JSON.stringify({ error: 'Current password is incorrect' })
                };
            }

            // Validate new password
            if (!data.newPassword || data.newPassword.length < 4) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'New password must be at least 4 characters' })
                };
            }

            // Confirm passwords match
            if (data.newPassword !== data.confirmPassword) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'New passwords do not match' })
                };
            }

            // Update credentials
            const updatedCreds = {
                ...currentCreds,
                password: data.newPassword,
                lastPasswordChange: new Date().toISOString()
            };

            const putCommand = new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: FILE_KEY,
                Body: JSON.stringify(updatedCreds, null, 4),
                ContentType: 'application/json'
            });

            await s3.send(putCommand);

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                    message: 'Password updated successfully',
                    lastPasswordChange: updatedCreds.lastPasswordChange
                })
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
