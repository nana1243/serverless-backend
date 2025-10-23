import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/framework/api-gateway';
import { middyfy } from '@libs/framework/lambda';

/**
 * 카카오 OAuth 시작
 * - 유효한 리프레시 토큰이 있으면 JWT 재발급 후 리다이렉트
 * - 그렇지 않으면 카카오 인가 화면으로 리다이렉트
**/

// oauth/token
const auth: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {

  return formatJSONResponse({
    message: `Hello  welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(auth)
