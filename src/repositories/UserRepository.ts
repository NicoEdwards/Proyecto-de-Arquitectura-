import { User } from '../models/User.ts';
import { UserModel } from '../database/UserModel.ts';

export class UserRepository {
  async save(user: User) {
    return await UserModel.create({
      email: user.email,
      password: user.password,
    });
  }

  async findByEmail(email: string) {
    return await UserModel.findOne({ email });
  }
}
