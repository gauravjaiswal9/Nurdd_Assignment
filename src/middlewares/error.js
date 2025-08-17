// Not Found handler (404)
export function notFound(req, res, next) {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl
  });
}

// General error handler (500+)
export function errorHandler(err, req, res, next) {
  console.error("❌ Error:", err);

  // In case headers already sent
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
}
