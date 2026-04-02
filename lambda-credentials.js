import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-2' });
const BUCKET_NAME = 'grotech-website-files';
const FILE_KEY = 'credentials.json';

// Helper function to get credentials from S3
async function getCredentials() {
    const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: FILE_KEY
    });
    const response = await s3.send(command);
    const body = await response.Body.transformToString();
    return JSON.parse(body);
}

export const handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
    };

    try {
        // Handle OPTIONS request for CORS
        if (event.httpMethod === 'OPTIONS') {
            return { statusCode: 200, headers, body: '' };
        }

        // POST - Login verification (server-side)
        if (event.httpMethod === 'POST' && event.path === '/credentials/login') {
            const data = JSON.parse(event.body);
            const creds = await getCredentials();

            // Verify credentials server-side
            if (data.email === creds.email && data.password === creds.password) {
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        success: true,
                        name: creds.name,
                        email: creds.email,
                        role: creds.role
                    })
                };
            } else {
                return {
                    statusCode: 401,
                    headers,
                    body: JSON.stringify({
                        success: false,
                        error: 'Invalid email or password'
                    })
                };
            }
        }

        // GET - Return credentials (without password for security)
        if (event.httpMethod === 'GET') {
            const creds = await getCredentials();

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
            const currentCreds = await getCredentials();

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
