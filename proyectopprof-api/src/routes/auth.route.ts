import { ROUTE_SEGMENTS } from "@/constants/routes.ts";
import { authController } from "@/controllers/auth.controller.ts";
import { loginAuthSchema } from "@/lib/zod/schemas/auth.schema.ts";
import { validateWithZod } from "@/middleware/validate-with-zod.ts";
import { Router } from "@oak/oak";

export const authRoute = new Router();

// Route definitions
authRoute.post(
  ROUTE_SEGMENTS.LOGIN,
  validateWithZod({ body: loginAuthSchema }),
  authController.login,
);
