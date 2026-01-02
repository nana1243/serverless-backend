import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const defaultHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const connectionId = event.requestContext.connectionId;
  const body = event.body;

  if (body === 'ping') {
    console.log(`[Heartbeat] ID: ${connectionId}`);
    return {
      statusCode: 200,
      body: 'pong'
    };
  }

  // 2. 그 외의 알 수 없는 메시지 처리
  console.log(`[Default] Unknown message from ${connectionId}:`, body);

  return {
    statusCode: 200,
    body: 'Message received by default handler'
  };
};

export default defaultHandler;