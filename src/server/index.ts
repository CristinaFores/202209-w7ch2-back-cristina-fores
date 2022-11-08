import express from "express";
import morgan from "morgan";
import { generalError, unknownEndpoint } from "./middleware/errors.js";
import robotRouter from "./routers/robotsRouter.js";
import cors from "cors";
import routes from "./routers/routes.js";

const { robots: robotsPath } = routes;

const app = express();

app.use(cors());
app.disable("x-powered-by");
app.use(express.json());
app.use(morgan("dev"));

app.use(robotsPath, robotRouter);

app.use("/*", unknownEndpoint);
app.use(generalError);

export default app;
