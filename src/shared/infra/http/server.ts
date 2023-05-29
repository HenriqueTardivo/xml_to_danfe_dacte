import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express from "express";
import { router } from "./routes";

const app = express();

app.use(cors());

app.use(express.text({ limit: "50mb" }));

app.use(router);

app.listen(process.env.APP_PORT || 3000, () => {
  console.log(`🚀 Server is running on port ${process.env.APP_PORT || 3000}`);
});
