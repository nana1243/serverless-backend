import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const user: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  return formatJSONResponse({
    message: `Hello  welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(user);
