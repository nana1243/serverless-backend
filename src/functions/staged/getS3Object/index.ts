
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 's3-object',
        request: {
          parameters: {
            querystrings: {
              key: true,
            },
          },
        },
      },
    },
  ],
};