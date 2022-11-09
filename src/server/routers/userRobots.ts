import express from "express";
import { loginUser } from "../controllers/userControllers.ts/userControllers.js";

import routes from "./routes.js";

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

const { loginUserRouter } = routes;

usersRouter.post(loginUserRouter, loginUser);

export default usersRouter;
