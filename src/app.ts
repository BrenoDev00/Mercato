import express, { Express } from "express";
import { corsOptions } from "./utils/cors-options.js";
import errorHandler from "./middlewares/error-handler.js";
import helmet from "helmet";
import cors from "cors";
import userRouter from "./routers/user-router.js";
import authRouter from "./routers/auth-router.js";
import roleRouter from "./routers/role-router.js";
import productRouter from "./routers/product-router.js";

const app: Express = express();

app.use(helmet());

app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth", authRouter);

app.use("/user", userRouter);

app.use("/role", roleRouter);

app.use("/product", productRouter);

app.use(errorHandler);

export default app;
