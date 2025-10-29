import { ValidatedEventAPIGatewayProxyEvent } from '@libs/framework/api-gateway';
import { middyfy } from '@libs/framework/lambda';
import getToken from '@libs/domain/utils/getToken';
import { generateTokenService } from './service'

const { KAKAO_CLIENT_ID, REDIRECT_URI } = process.env;

// oauth/token
const kakaoLoginStartHandler: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {

  const refreshToken = getToken(event.headers['Cookie'] || event.headers['cookie'] || '');
  if(refreshToken){
    const newAccessToken =  generateTokenService();

  }
  const kakaoRedirectUri = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image`;
  return {
    statusCode : 302,
    headers: {
      Location: kakaoRedirectUri,
    },
    body: ''
  }
};

export const main = middyfy(kakaoLoginStartHandler)
