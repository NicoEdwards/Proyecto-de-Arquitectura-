import { User } from '../models/User.ts';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
