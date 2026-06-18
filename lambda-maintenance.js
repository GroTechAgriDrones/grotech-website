import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-2' });
const BUCKET_NAME = 'grotech-website-files';
const MAINT_KEY = 'maintenance_records/maintenance_records.json';

async function getRecords() {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: MAINT_KEY
        });
        const response = await s3.send(command);
        const body = await response.Body.transformToString();
        const data = JSON.parse(body);
        return data.records || [];
    } catch (error) {
        return [];
    }
}

async function saveRecords(records) {
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: MAINT_KEY,
        Body: JSON.stringify({ records }, null, 2),
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
        if (event.httpMethod === 'OPTIONS') {
            return { statusCode: 200, headers, body: '' };
        }

        const recordId = event.pathParameters?.id;

        // GET - List all records
        if (event.httpMethod === 'GET') {
            const records = await getRecords();
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ records })
            };
        }

        // POST - Create new record
        if (event.httpMethod === 'POST') {
            const recordData = JSON.parse(event.body);
            const records = await getRecords();
            records.unshift(recordData);
            await saveRecords(records);
            return {
                statusCode: 201,
                headers,
                body: JSON.stringify({ message: 'Maintenance record created', record: recordData })
            };
        }

        // PUT - Update record
        if (event.httpMethod === 'PUT') {
            if (!recordId) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Record ID required' })
                };
            }
            const updateData = JSON.parse(event.body);
            const records = await getRecords();
            const index = records.findIndex(r => r.id === recordId);
            if (index === -1) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ error: 'Record not found' })
                };
            }
            records[index] = { ...records[index], ...updateData, id: recordId };
            await saveRecords(records);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: 'Record updated', record: records[index] })
            };
        }

        // DELETE - Delete record
        if (event.httpMethod === 'DELETE') {
            if (!recordId) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Record ID required' })
                };
            }
            const records = await getRecords();
            const updated = records.filter(r => r.id !== recordId);
            if (updated.length === records.length) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ error: 'Record not found' })
                };
            }
            await saveRecords(updated);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: 'Record deleted', id: recordId })
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
