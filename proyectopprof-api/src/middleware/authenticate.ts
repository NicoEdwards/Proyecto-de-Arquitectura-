import { jwtKey } from "@/lib/djwt/jwt-key.ts";
import { JwtUser } from "@/lib/djwt/types.ts";
import { HttpErrorWithDetails } from "@/utils/http-error-with-details.ts";
import { Next, RouterContext } from "@oak/oak";
import { STATUS_CODE } from "@std/http/status";
import { verify } from "djwt/mod.ts";

// Constants
const UNAUTHORIZED_ERROR = new HttpErrorWithDetails({
  message: "Unauthorized",
  status: STATUS_CODE.Unauthorized,
});

export const authenticate = async <T extends string>(
  ctx: RouterContext<T>,
  next: Next,
) => {
  // Check if token is present
  const authHeader = ctx.request.headers.get("Authorization");
  const isBearer = authHeader?.toLowerCase().startsWith("bearer ");
  const jwtToken = authHeader?.slice(7).trim();
  if (!authHeader || !isBearer || !jwtToken) throw UNAUTHORIZED_ERROR;

  // Verify token
  let jwtUser: JwtUser;
  try {
    jwtUser = await verify(jwtToken, jwtKey);
  } catch (_) {
    throw UNAUTHORIZED_ERROR;
  }

  // Attach user to context state
  ctx.state.user = jwtUser;

  // Succeeded
  return next();
};
