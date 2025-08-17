import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeSite(url) {
  const resp = await axios.get(url, {
    timeout: 10000,
    headers: { "User-Agent": "Mozilla/5.0 (compatible; SiteBot/1.0)" }
  });
  const $ = cheerio.load(resp.data);

  const get = (sel, attr) => attr ? $(sel).attr(attr) : $(sel).text();

  const metaTitle = get("title");
  const ogSiteName = get("meta[property='og:site_name']", "content");
  const ogTitle = get("meta[property='og:title']", "content");
  const h1 = $("h1").first().text();

  // Brand name heuristic:
  const brandName = ogSiteName || ogTitle || metaTitle || h1 || null;

  // Description heuristic:
  const metaDesc =
    get("meta[name='description']", "content") ||
    get("meta[property='og:description']", "content") ||
    null;

  return {
    brandName: brandName?.trim() || null,
    description: metaDesc?.trim() || null,
    meta: {
      title: metaTitle || null,
      ogSiteName: ogSiteName || null,
      metaDescription: metaDesc || null
    }
  };
}
