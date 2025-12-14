import auth from '@functions/auth';
import chat from '@functions/chat';

export const handler = {
  ...auth,
  ...chat
};