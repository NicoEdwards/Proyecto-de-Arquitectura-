import { ROUTE_SEGMENTS } from "@/constants/routes.ts";
import { scraperController } from "@/controllers/scraper.controller.ts";
import { authenticate } from "@/middleware/authenticate.ts";
import { Router } from "@oak/oak";

export const scraperRoute = new Router();

// Route definitions
scraperRoute.post(
  ROUTE_SEGMENTS.BCI,
  authenticate,
  scraperController.scrapeBci,
);

scraperRoute.post(
  ROUTE_SEGMENTS.CHILE,
  authenticate,
  scraperController.scrapeChile,
);
