import { UserRepository } from '../repositories/UserRepository.ts';
import { comparePasswords } from '../utils/bcrypt.ts';
import { generateToken } from '../utils/jwt.ts';

export class AuthService {
  private userRepository = new UserRepository();

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    const isPasswordCorrect = await comparePasswords(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    const token = await generateToken({ id: user._id, email: user.email });

    return token;
  }
}
