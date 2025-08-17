import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeSite(url) {
  try {
    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      timeout: 30000,
    });

    const $ = cheerio.load(html);

    const brandName =
      $('meta[property="og:site_name"]').attr("content") ||
      $("title").text() ||
      $("h1").first().text() ||
      "Unknown Brand";

    const description =
      $('meta[name="description"]').attr("content") ||
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="twitter:description"]').attr("content") ||
      $("p").first().text() ||
      "No description available";

    return {
      brandName: brandName.trim(),
      description: description.trim(),
    };
  } catch (err) {
    console.error("❌ Scraper error:", err.message);
    throw new Error("Failed to scrape the website");
  }
}
