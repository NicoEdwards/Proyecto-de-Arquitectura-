import { usersController } from "@/controllers/users.controller.ts";
import {
  createUserSchema,
  updateUserSchema,
} from "@/lib/zod/schemas/users.schema.ts";
import { authenticate } from "@/middleware/authenticate.ts";
import { validateWithZod } from "@/middleware/validate-with-zod.ts";
import { Router } from "@oak/oak";

export const usersRoute = new Router();

// Route definitions
usersRoute.get(
  "/",
  authenticate,
  usersController.get,
);

usersRoute.post(
  "/",
  validateWithZod({ body: createUserSchema }),
  usersController.create,
);

usersRoute.patch(
  "/",
  authenticate,
  validateWithZod({ body: updateUserSchema }),
  usersController.update,
);
