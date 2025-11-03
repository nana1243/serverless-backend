import { UserRepository } from '@libs/domain/repositories/authRepository';

interface KakaoLoginStartServiceRequest {
  refreshToken: string;
  userRepository: UserRepository
}

interface KakaoLoginStartServiceResult {
  refresh:string;
  access:string;
}



export {
  KakaoLoginStartServiceRequest,
  KakaoLoginStartServiceResult
}