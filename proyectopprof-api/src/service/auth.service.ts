import { jwtKey } from "@/lib/djwt/jwt-key.ts";
import { JwtUser } from "@/lib/djwt/types.ts";
import { LoginAuth } from "@/lib/zod/schemas/auth.schema.ts";
import { HttpErrorWithDetails } from "@/utils/http-error-with-details.ts";
import { STATUS_CODE } from "@std/http";
import * as bcrypt from "bcrypt/mod.ts";
import { create, getNumericDate } from "djwt/mod.ts";
import { usersService } from "./users.service.ts";

// Types
type JwtPayload = JwtUser & { exp: number };

export class AuthService {
  public login = async ({ email, password }: LoginAuth) => {
    // Get user
    const user = await usersService.getByEmailWithPassword(email);

    // Check if password is valid
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      throw new HttpErrorWithDetails({
        message: "Invalid password",
        status: STATUS_CODE.Unauthorized,
      });
    }

    // Create jwt token
    const payload: JwtPayload = {
      id: user.id,
      exp: getNumericDate(60 * 60), // Token expires after 1 hour
    };
    const token = await create({ alg: "HS512", typ: "JWT" }, payload, jwtKey);

    // Return token
    return { token };
  };
}

export const authService = new AuthService();
