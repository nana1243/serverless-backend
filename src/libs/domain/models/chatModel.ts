import { z } from 'zod';

export const ChatEntitySchema = z.object({
  id: z.string(),
  userIds: z.array(z.string()), // 참여자 ID 목록
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lastMessageText: z.string().optional(),
  lastMessageTimestamp: z.string().datetime().optional()
});

export type ChatEntity = z.infer<typeof ChatEntitySchema>;