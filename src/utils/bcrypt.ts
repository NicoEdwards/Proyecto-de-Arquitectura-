import { compare } from 'npm:bcryptjs';

export async function comparePasswords(password: string, hash: string) {
  return await compare(password, hash);
}
