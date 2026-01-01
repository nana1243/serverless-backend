import { z } from 'zod';

export const ConnectionEntitySchema = z.object({
  connectionId: z.string(),
  roomId: z.string().default('LOBBY'),
  userId: z.string(),
  connectedAt: z.string().datetime(),
  disconnectedAt: z.string().datetime().optional(),
  ttl: z.number().default(() => Math.floor(Date.now() / 1000) + 3600)
});


export type ConnectionEntity = z.infer<typeof ConnectionEntitySchema>;