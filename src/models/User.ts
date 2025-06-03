// Modelo de usuario en la aplicación
import type { UserRegisterData } from '../schemas/userSchema.ts';

export class User {
  public email: string;
  public password: string;

  constructor({ email, password }: UserRegisterData) {
    this.email = email;
    this.password = password;
  }
}
