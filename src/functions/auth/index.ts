import { handlerPath } from '@libs/framework/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: '/kakao',
        request: {},
      },
    },
  ],
};
