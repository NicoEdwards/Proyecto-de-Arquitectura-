import { BROWSERLESS_TOKEN, ENVIRONMENT } from "@/config/env.ts";
import { bciBank, chileBank } from "@/constants/banks.ts";
import { connect, launch } from "jsr:@astral/astral";
import { feedsService } from "./feeds.service.ts";

class ScraperService {
  public scrapeBci = async () => {
    // Load page
    const browser = await this.getBrowser(); // Launch browser
    const page = await browser.newPage(bciBank.url); // Go to page

    // Wait for page to load
    const bciSelector =
      ".w-100.px-3.px-lg-0.pl-lg-4.d-flex.flex-wrap.align-items-stretch";
    await page.waitForSelector(bciSelector);
    await page.waitForFunction(
      () => {
        const benefitsContainer = document.querySelector(
          ".w-100.px-3.px-lg-0.pl-lg-4.d-flex.flex-wrap.align-items-stretch",
        );
        if (!benefitsContainer) return false;
        return Array.from(benefitsContainer.querySelectorAll("a")).length > 0;
      },
    );

    // Get benefits
    const benefits = [];
    const numPages = 30;
    for (let i = 0; i < numPages; i++) {
      const newBenefits = await page.evaluate((selector, bankId) => {
        const benefitsContainer = document.querySelector(selector);
        const benefitsLinks = benefitsContainer?.querySelectorAll("a");
        if (!benefitsContainer || !benefitsLinks) return [];

        return Array.from(benefitsLinks).map((item) => {
          const paragraphs = Array.from(item.querySelectorAll("div div div p"));
          const paragraphTexts = paragraphs.map(({ textContent }) =>
            textContent
          );
          return {
            bankId,
            url: item.getAttribute("href") || "",
            title: paragraphTexts[0] || "",
            image:
              item.querySelector("article figure img")?.getAttribute("src") ||
              "",
            description: paragraphTexts[2] || paragraphTexts[1] || "",
          };
        });
      }, { args: [bciSelector, bciBank.id] });

      // Add benefits from current page to results
      benefits.push(...newBenefits);

      // Check if there is a next page
      const bciNextPageSelector =
        ".paginator__button.paginator__button--right.p-2.m-2.d-flex.align-items-center.justify-content-center";
      const nextPage = await page.$(bciNextPageSelector);
      if (!nextPage) break;

      // Click next page button
      await nextPage.click();

      // Wait for page to load
      await page.waitForSelector(bciSelector);
      await page.waitForFunction(
        () => {
          const benefitsContainer = document.querySelector(
            ".w-100.px-3.px-lg-0.pl-lg-4.d-flex.flex-wrap.align-items-stretch",
          );
          if (!benefitsContainer) return false;
          return Array.from(benefitsContainer.querySelectorAll("a")).length > 0;
        },
      );
    }

    // Close page
    await browser.close();

    // Insert data
    await feedsService.insertAndSkipDuplicates(benefits);
  };

  public scrapeChile = async () => {
    // Load page
    const browser = await this.getBrowser(); // Launch browser
    const page = await browser.newPage(chileBank.url); // Go to page
    const chileSelector = "#beneficios";
    // Wait for page to load
    await page.waitForSelector(chileSelector);
    await page.waitForFunction(
      () => {
        const benefitsContainer = document.querySelector("#beneficios");
        if (!benefitsContainer) return false;
        return Array.from(benefitsContainer.querySelectorAll("a")).length > 0;
      },
    );

    // Get benefits
    const benefits = await page.evaluate((selector, bankId) => {
      const benefitsContainer = document.querySelector(selector);
      const benefitsLinks = benefitsContainer?.querySelectorAll("a");
      if (!benefitsContainer || !benefitsLinks) return [];

      return Array.from(benefitsLinks).map((item) => {
        const paragraphs = Array.from(item.querySelectorAll("div div p"));
        const paragraphTexts = paragraphs.map(({ textContent }) => textContent);
        return {
          bankId,
          url: item.getAttribute("href") || "",
          title: paragraphTexts[0] || "",
          description: `${paragraphTexts[1]} - ${paragraphTexts[2]}` || "",
          image: item.querySelector("div img")?.getAttribute("src") || "",
        };
      });
    }, { args: [chileSelector, chileBank.id] });

    // Close page
    await browser.close();

    // Insert data
    await feedsService.insertAndSkipDuplicates(benefits);
  };

  private getBrowser = async () => {
    const wsEndpoint =
      `wss://production-sfo.browserless.io?token=${BROWSERLESS_TOKEN}`;

    // Connect to production browser or launch local browser based on environment
    const browser = ENVIRONMENT === "production"
      ? await connect({ wsEndpoint })
      : await launch();

    return browser;
  };
}

export const scraperService = new ScraperService();
