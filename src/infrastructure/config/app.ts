import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

//* interface
import IErrorObject from "../../useCases/interfaces/IErrorObject";

//* config dotenv
dotenv.config();

export const createServer = () => {
  try {
    const app = express();

    app.use(
      cors({
        origin: process.env.ORIGIN || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        credentials: true,
      })
    );
    app.options("*", cors());

    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "/public")));
    app.use(cookieParser());

    //* test
    console.log(path.join(__dirname, "/public")); //TODO: remove this line after test

    app.get("/", (_req: Request, res: Response) => {
      res.send("Hello World");
    });

    // app.use("/api/user", );
    // app.use("/api/blog");

    app.use((err:IErrorObject, _req: Request, res: Response, _next: NextFunction) => {
      const { statusCode,error } = err;
      const status = statusCode || 500;
      const message: String = error.message || "Internal Server Error";
      res.status(status).send({ message});
    });

    return app;
  } catch (error) {
    const err: Error = error as Error;
    console.log(err.message);
  }
};
