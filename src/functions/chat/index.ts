import { handlerPath } from '@libs/framework/handler-resolver';

export const listUserChats = {
  handler: `${handlerPath(__dirname)}/list-user-chats/handler.main`,
  event: [
    {
      http: {
        method: 'get',
        path: '/users/{userId}/chats',
        request: {
          parameters: {
            paths: {
              userId: true
            }
          }
        }
      }
    }
  ]
};

export default {
  listUserChats: listUserChats
}