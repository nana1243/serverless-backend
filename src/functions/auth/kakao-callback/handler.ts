import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/framework/api-gateway';
import { middyfy } from '@libs/framework/lambda';

import KakaoCallbackService from './service';

const kakaoCallbackHandler: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {

  const code = event.queryStringParameters?.code;
  const result = KakaoCallbackService({ code });

  return formatJSONResponse({
    data: result
  });

};

export const main = middyfy(kakaoCallbackHandler);