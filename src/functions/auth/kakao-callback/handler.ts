import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/framework/api-gateway';
import { middyfy } from '@libs/framework/lambda';


const kakaoCallbackHandler: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {

  return formatJSONResponse({
    message: `Hello  welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(kakaoCallbackHandler)