import { UserRepository } from '@libs/domain/repositories/authRepository';

interface KakaoLoginStartServiceProps{
  refreshToken: string;
  userRepository: UserRepository
}

interface KakaoLoginStartServiceResult {
  refresh:string;
  access:string;
}



export {
  KakaoLoginStartServiceProps,
  KakaoLoginStartServiceResult
}