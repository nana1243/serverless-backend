import { handlerPath } from '@libs/framework/handler-resolver';

export const kakaoStart = {
  handler: `${handlerPath(__dirname)}/kakao-start/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: '/kakao',
        request: {}
      }
    }
  ]
};

export const kakaoCallback = {
  handler: `${handlerPath(__dirname)}/kakao-callback/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: '/kakao/callback',
        request: {
          parameters: {
            querystrings: {
              code: true,
              state: true
            }
          }
        }
      }
    }
  ]
};


export default {
  kakaoStart: kakaoStart,
  kakaoCallback: kakaoCallback
}