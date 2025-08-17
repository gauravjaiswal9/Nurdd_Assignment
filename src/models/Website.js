import mongoose from "mongoose";

const websiteSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true, trim: true },
    brandName: { type: String, default: null },
    description: { type: String, default: null },
    enhancedDescription: { type: String, default: null }, // optional AI
    meta: {
      title: String,
      ogSiteName: String,
      metaDescription: String,
    },
    status: { type: String, enum: ["ok", "error"], default: "ok" },
    error: { type: String, default: null }
  },
  { timestamps: true }
);

export default mongoose.model("Website", websiteSchema);
