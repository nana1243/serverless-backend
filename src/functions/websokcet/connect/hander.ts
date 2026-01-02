import { ValidatedEventAPIGatewayProxyEvent } from '@libs/framework/api-gateway';
import { middyfy } from '@libs/framework/lambda';
import websocketConnectService from '@functions/websokcet/connect/service';
import { ConnectionRepository } from '@libs/domain/repositories/connectionRepository';


const websocketConnectHandler: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  const connectionId = event.requestContext.connectionId;
  const roomId = event.queryStringParameters?.roomId || 'LOBBY';
  const userId = event.queryStringParameters?.userId || 'ANONYMOUS';

  const connectionRepository = new ConnectionRepository();

  try {
    websocketConnectService({
      connectionRepository,
      connectionId,
      userId,
      roomId
    });
    console.log(`[Connected] ID: ${connectionId}, Room: ${roomId}`);
    return { statusCode: 200, body: 'Connected.' };
  } catch (error) {
    console.error('Connect Error:', error);
    return { statusCode: 500, body: 'Failed to connect.' };
  }
};

export const main = middyfy(websocketConnectHandler);