import { ValidatedEventAPIGatewayProxyEvent } from '@libs/framework/api-gateway';
import { ConnectionRepository } from '@libs/domain/repositories/connectionRepository';
import disconnectService from '@functions/websokcet/disconnect/service';

const disconnectHandler: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  const connectionId = event.requestContext.connectionId;
  const connectRepository = new ConnectionRepository();

  try {
    await disconnectService({ connectionId, connectRepository });
    console.log(`[Disconnected] ID: ${connectionId}`);
    return { statusCode: 200, body: 'Disconnected.' };
  } catch (error) {
    console.error('Disconnect Error:', error);
    return { statusCode: 500, body: 'Failed to disconnect.' };
  }

};


export default disconnectHandler;