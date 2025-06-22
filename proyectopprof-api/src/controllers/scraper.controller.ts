import { scraperService } from "@/service/scraper.service.ts";
import { Context } from "@oak/oak/context";

class ScraperController {
  public scrapeBci = async (ctx: Context) => {
    await scraperService.scrapeBci(); // Scrape bci

    // Response
    ctx.response.body = { "message": "Bci web scraper complete" };
  };

  public scrapeChile = async (ctx: Context) => {
    await scraperService.scrapeChile(); // Scrape chile

    // Response
    ctx.response.body = { "message": "Chile web scraper complete" };
  };
}

export const scraperController = new ScraperController();
