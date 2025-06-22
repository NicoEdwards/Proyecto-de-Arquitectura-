import { Router } from "@oak/oak";
import { ROUTES } from "./constants/routes.ts";
import { authRoute } from "./routes/auth.route.ts";
import { feedsRoute } from "./routes/feeds.route.ts";
import { scraperRoute } from "./routes/scraper.route.ts";
import { usersRoute } from "./routes/users.route.ts";

export const router = new Router();

// Routes
router.use(ROUTES.USERS, usersRoute.routes());
router.use(ROUTES.AUTH, authRoute.routes());
router.use(ROUTES.SCRAPER, scraperRoute.routes());
router.use(ROUTES.FEEDS, feedsRoute.routes());

router.get("/", (ctx) => {
  ctx.response.body = { message: "Service is up and running" };
});
