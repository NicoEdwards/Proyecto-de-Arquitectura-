import { authService } from "@/service/auth.service.ts";
import { Context } from "@oak/oak";

class AuthController {
  public login = async (ctx: Context) => {
    const body = await ctx.request.body.json(); // Get body
    const record = await authService.login(body); // Get response

    // Response
    ctx.response.body = record;
  };
}

export const authController = new AuthController();
