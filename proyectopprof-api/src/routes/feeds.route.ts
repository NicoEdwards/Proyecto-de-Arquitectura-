import { feedsController } from "@/controllers/feeds.controller.ts";
import { getAllUsersSchema } from "@/lib/zod/schemas/feeds.schema.ts";
import { authenticate } from "@/middleware/authenticate.ts";
import { validateWithZod } from "@/middleware/validate-with-zod.ts";
import { Router } from "@oak/oak";

export const feedsRoute = new Router();

// Route definitions
feedsRoute.get(
  "/",
  authenticate,
  validateWithZod({ query: getAllUsersSchema }),
  feedsController.getAllByUserId,
);
