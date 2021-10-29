import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";

import routes from "./routes";
import AppError from "./erros/AppError";

import "./database";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.log('err ', err)
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(3333, () => {
  console.log("🚀️ Server started on port 3333!");
});
