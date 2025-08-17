// src/services/scraper.js
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export async function scrapeSite(url) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new", // modern headless mode
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

    // Set a realistic user agent
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    );
    await page.setViewport({ width: 1366, height: 850 });

    // Go to the page and wait for network to settle
    await page.goto(url, {
      waitUntil: ["domcontentloaded", "networkidle2"],
      timeout: 45000,
    });

    // Safe wait for older Puppeteer versions
    if (typeof page.waitForTimeout === "function") {
      await page.waitForTimeout(800); // modern Puppeteer
    } else {
      await new Promise((resolve) => setTimeout(resolve, 800)); // fallback
    }

    const meta = await page.evaluate(() => {
      const pick = (sel, attr = "content") => {
        const el = document.querySelector(sel);
        return el ? (attr === "text" ? el.textContent : el.getAttribute(attr)) : "";
      };

      const brandCandidates = [
        () => pick('meta[property="og:site_name"]'),
        () => pick("title", "text"),
        () => pick("h1", "text"),
      ];

      const descCandidates = [
        () => pick('meta[name="description"]'),
        () => pick('meta[property="og:description"]'),
        () => pick('meta[name="twitter:description"]'),
        () => pick("h1", "text"),
        () => pick("title", "text"),
        () => pick("p", "text"),
      ];

      const firstNonEmpty = (arr) =>
        arr.map((fn) => (fn() || "").trim()).find((v) => v.length > 0) || "";

      return {
        brandName: firstNonEmpty(brandCandidates),
        description: firstNonEmpty(descCandidates),
      };
    });

    // Cheerio fallback if needed
    if (!meta.brandName || !meta.description) {
      const html = await page.content();
      const $ = cheerio.load(html);

      const brandName =
        meta.brandName ||
        $('meta[property="og:site_name"]').attr("content") ||
        $("title").text() ||
        $("h1").first().text() ||
        "Unknown Brand";

      const description =
        meta.description ||
        $('meta[name="description"]').attr("content") ||
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="twitter:description"]').attr("content") ||
        $("h1").first().text() ||
        $("title").text() ||
        $("p").first().text() ||
        "No description available";

      return {
        brandName: brandName.trim(),
        description: description.trim(),
      };
    }

    return {
      brandName: (meta.brandName || "Unknown Brand").trim(),
      description: (meta.description || "No description available").trim(),
    };
  } catch (err) {
    console.error("❌ Puppeteer scrape error:", err.message);
    throw new Error("Failed to render and scrape the website");
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
}
