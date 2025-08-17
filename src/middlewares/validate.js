export function validateUrl(req, res, next) {
  const { url } = req.body || {};
  try {
    const u = new URL(url);
    if (!["http:", "https:"].includes(u.protocol)) throw new Error();
    next();
  } catch {
    return res.status(400).json({ error: "Invalid URL" });
  }
}
