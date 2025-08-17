import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectDB } from "./db.js";
import websiteRoutes from "./routes/websiteRoutes.js";
import { notFound, errorHandler } from "./middlewares/error.js";

const app = express();

//Global middlewares
app.use(express.json());
app.use(cors());


//Routes
app.use("/api", websiteRoutes);

//Error middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

// console.log("MONGO_URI from env:", process.env.MONGO_URI);

connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
});
