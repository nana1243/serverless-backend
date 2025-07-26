import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { middyfy } from '@libs/lambda';

const REGION = process.env.AWS_REGION || 'ap-northeast-2';
const BUCKET_NAME = 'i18n-automation';
const BUCKET_PREFIX = 'nana1243/react-typescript/v1.0.1';

const s3Client = new S3Client({ region: REGION });

const streamToString = (stream: Readable): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });

export const getS3Object = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const key = event.queryStringParameters?.key;

  if (!key) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing key query parameter.' }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: `${BUCKET_PREFIX}/${key}`
  };

  try {
    const command = new GetObjectCommand(params);
    const { Body, ContentType } = await s3Client.send(command);

    if (!Body) {
      console.warn(`S3 object body is empty for ${BUCKET_PREFIX}/${key}`);
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'File not found or empty.' }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    const jsonString = await streamToString(Body as Readable);
    const parsedData = JSON.parse(jsonString);

    console.log(`Successfully retrieved and parsed S3 object: ${key}`);

    return {
      statusCode: 200,
      body: JSON.stringify(parsedData),
      headers: {
        'Content-Type': ContentType || 'application/json',
        'Access-Control-Allow-Origin': '*', // CORS 허용 (필요에 따라 특정 도메인으로 제한)
      },
    };
  } catch (error: any) {
    console.error(`Error getting object ${BUCKET_NAME}/${BUCKET_PREFIX}/${key} from S3:`, error);

    if (error.name === 'NoSuchKey') {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: `File not found: ${key}` }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    } else if (error.name === 'AccessDenied') {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: 'Access denied to S3 object.' }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to retrieve data from S3.', error: error.message }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};

export const main = middyfy(getS3Object);