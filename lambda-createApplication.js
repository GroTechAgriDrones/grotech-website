import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const s3 = new S3Client({});
const ses = new SESClient({ region: "us-east-2" });

export const handler = async (event) => {
    const body = JSON.parse(event.body);
    
    const nextId = await getNextAppId();
    const appId = `APP-${String(nextId).padStart(3, '0')}`;
    
    const application = {
        id: appId,
        ...body,
        status: 'pending',
        dateSubmitted: new Date().toISOString()
    };
    
    await s3.send(new PutObjectCommand({
        Bucket: 'grotech-website-files',
        Key: `applications/${appId}.json`,
        Body: JSON.stringify(application, null, 2),
        ContentType: 'application/json'
    }));
    
    await ses.send(new SendEmailCommand({
        Source: 'grotechagridrones@gmail.com',
        Destination: { ToAddresses: ['grotechagridrones@gmail.com'] },
        Message: {
            Subject: { Data: `New Application: ${appId} - ${body.fullName}` },
            Body: { 
                Text: { 
                    Data: `New application received!\n\nID: ${appId}\nName: ${body.fullName}\nPhone: ${body.phone}\n\nLog in to dashboard to review.` 
                }
            }
        }
    }));
    
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({ success: true, applicationId: appId })
    };
};

async function getNextAppId() {
    try {
        const response = await s3.send(new ListObjectsV2Command({
            Bucket: 'grotech-website-files',
            Prefix: 'applications/'
        }));
        
        const files = response.Contents || [];
        let highestId = 0;
        
        for (const file of files) {
            if (file.Key.endsWith('.json')) {
                try {
                    const getResponse = await s3.send(new GetObjectCommand({
                        Bucket: 'grotech-website-files',
                        Key: file.Key
                    }));
                    const body = await getResponse.Body.transformToString();
                    const data = JSON.parse(body);
                    
                    if (data.id) {
                        const match = data.id.match(/^APP-(\d+)$/);
                        if (match) {
                            const num = parseInt(match[1], 10);
                            if (num > highestId) {
                                highestId = num;
                            }
                        }
                    }
                } catch (e) {
                    console.log(`Error reading ${file.Key}:`, e.message);
                }
            }
        }
        
        return highestId + 1;
    } catch (e) {
        console.error('Error getting next app ID:', e);
        return 1;
    }
}
