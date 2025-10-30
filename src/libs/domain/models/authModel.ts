import { z } from 'zod';

export const UserEntitySchema = z.object({
  id: z.string().uuid("사용자 ID는 UUID 형식이어야 합니다."),
  name: z.string().max(50),
  email: z.string().email(),
  passwordHash: z.string().describe("저장된 암호화된 비밀번호 해시"), // 요청 스키마에는 password지만, 모델에는 hash가 들어갑니다.
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'), // 상태 관리
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  refreshTokens : z.array(z.string())
});

export type UserEntity = z.infer<typeof UserEntitySchema>;

export const UserResponseSchema = UserEntitySchema.omit({
  passwordHash: true,
});

export type UserResponse = z.infer<typeof UserResponseSchema>;