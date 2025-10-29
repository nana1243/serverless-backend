import {verify} from '@libs/domain/utils/auth-jwt';
import { UserRepository } from '@libs/domain/repositories/authRepository';

interface GenerateTokenServiceProps{
  refreshToken: string;
  userRepository: UserRepository
}

const generateTokenService = async (props : GenerateTokenServiceProps) => {
  const {refreshToken, userRepository} = props;

  try {
    const { uid } = verify(refreshToken);
    const user = await userRepository.getUserById(uid);

  } catch (error) {
    throw error;
  }
}

export {
  generateTokenService,
}