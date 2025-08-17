import { Router } from "express";
import {
  analyzeWebsite, listWebsites, getWebsite, updateWebsite, deleteWebsite
} from "../controllers/websiteController.js";

import { validateUrl } from "../middlewares/validate.js";

const router = Router();
router.post("/websites/analyze", validateUrl, analyzeWebsite);
router.get("/websites", listWebsites);
router.get("/websites/:id", getWebsite);
router.put("/websites/:id", updateWebsite);
router.delete("/websites/:id", deleteWebsite);

export default router;
