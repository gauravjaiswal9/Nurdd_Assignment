import Website from "../models/Website.js";
import { scrapeSite } from "../services/scraper.js";
import { refineDescription } from "../services/ai.js"; // optional

export async function analyzeWebsite(req, res) {
  const { url } = req.body;
  try {
    const scraped = await scrapeSite(url);
    const enhanced = await refineDescription(scraped.description);

    const doc = await Website.findOneAndUpdate(
      { url },
      {
        url,
        brandName: scraped.brandName,
        description: scraped.description,
        // enhancedDescription: enhanced,
        // meta: scraped.meta,
        status: "ok",
        error: null
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(201).json(doc);
  } catch (err) {
    const doc = await Website.findOneAndUpdate(
      { url },
      { url, status: "error", error: err.message },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.status(504).json({ error: "Failed to analyze site", details: doc });
  }
}

export async function listWebsites(req, res) {
  const page = Math.max(1, parseInt(req.query.page || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit || "10")));
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Website.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Website.countDocuments()
  ]);
  res.json({ page, limit, total, items });
}

export async function getWebsite(req, res) {
  const doc = await Website.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json(doc);
}

export async function updateWebsite(req, res) {
  const doc = await Website.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json(doc);
}

export async function deleteWebsite(req, res) {
  const doc = await Website.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
}
