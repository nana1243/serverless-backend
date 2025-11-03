import { signAccess, signRefresh, verify } from '@libs/domain/utils/auth-jwt';
import { KakaoLoginStartServiceRequest, KakaoLoginStartServiceResult } from '@functions/auth/kakao-start/schema';


const kakaoLoginStartService = async (props : KakaoLoginStartServiceRequest): Promise<KakaoLoginStartServiceResult | null> => {
  const {refreshToken, userRepository} = props;

  try {
    const { uid } = verify(refreshToken);
    const user = await userRepository.getUserById( {
      id:uid,
      refreshCookie:refreshToken
    });
    if(user){
      const access = signAccess(uid);
      const refresh = signRefresh(uid);
      user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken)
      user.refreshTokens.push(refresh)
      await userRepository.saveUser(user);
      return {
        access,
        refresh
      }
    }
  } catch (error) {
    throw error;
  }
  return null
}

export {
  kakaoLoginStartService,
}