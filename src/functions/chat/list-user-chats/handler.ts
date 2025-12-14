import { ValidatedEventAPIGatewayProxyEvent } from '@libs/framework/api-gateway';
import { middyfy } from '@libs/framework/lambda';

const listUserChatsHandler: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  console.log('event:', event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'listUserChatsHandler executed successfully!',
      input: event
    })
  };
};


export const main = middyfy(listUserChatsHandler);