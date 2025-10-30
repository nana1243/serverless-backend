import { ValidatedEventAPIGatewayProxyEvent } from '@libs/framework/api-gateway';
import { middyfy } from '@libs/framework/lambda';
import getToken from '@libs/domain/utils/getToken';
import { kakaoLoginStartService } from './service';
import { UserRepository } from '@libs/domain/repositories/authRepository';

const { KAKAO_CLIENT_ID, REDIRECT_URI, FRONTEND_URL } = process.env;
const userRepository = new UserRepository();

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=profile_nickname,profile_image`;

const kakaoLoginStartHandler: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  const refreshToken = getToken(event.headers['Cookie'] || event.headers['cookie'] || '');

  let redirectLocation = KAKAO_AUTH_URL;
  const responseHeaders: Record<string, string> = {};

  if (refreshToken) {
    try {
      const result = await kakaoLoginStartService({ refreshToken, userRepository });

      if (result) {
        const { access, refresh } = result;
        const maxAgeSeconds = 7 * 24 * 60 * 60;
        responseHeaders['Set-Cookie'] = `refresh_token=${refresh}; HttpOnly; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax; Secure=true`;

        redirectLocation = `${FRONTEND_URL}/auth/callback/kakao?access_token=${access}`;
      }
    } catch (e) {
      // 4. 에러 발생 시 (리프레시 토큰 만료/위조 등)
      console.warn("Refresh token validation failed, redirecting to Kakao auth.", e);
     }
  }

  return {
    statusCode: 302,
    headers: {
      ...responseHeaders,
      Location: redirectLocation,
    },
    body: '',
  };
};

export const main = middyfy(kakaoLoginStartHandler);