import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { router } from "../../../routes";
const app = express();

app.use(cors());

app.use(express.text({ limit: "50mb" }));

app.use((request: Request, response: Response, next: NextFunction) => {
  const { api_key } = request.query;

  const apiToken = process.env.TOKEN_SECRET;

  if (api_key === apiToken) {
    return next();
  }

  return response.status(401).json({ message: "Não autorizado!" });
});

app.use(router);

app.listen(process.env.APP_PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.APP_PORT}`);
});
