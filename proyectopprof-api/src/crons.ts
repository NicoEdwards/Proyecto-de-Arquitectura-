import { scraperService } from "./service/scraper.service.ts";

// Values
const backoffSchedule = [1000, 5000, 10000];

// Utils
const scrapeBanks = async () => {
  await scraperService.scrapeChile().catch((err) => console.error(err));
  await scraperService.scrapeBci().catch((err) => console.error(err));
};

export const startCrons = () => {
  Deno.cron(
    "Run at half of the day",
    "0 12 * * *",
    { backoffSchedule },
    async () => {
      await scrapeBanks();
      console.log("Cron: Web scraper ran successfully");
    },
  );

  Deno.cron(
    "Run at the start of the day",
    "0 0 * * *",
    { backoffSchedule },
    async () => {
      await scrapeBanks();
      console.log("Cron: Web scraper ran successfully");
    },
  );
};
