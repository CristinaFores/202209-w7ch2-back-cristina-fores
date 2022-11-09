import express from "express";
import {
  getRobots,
  getRobotById,
  deleteRobotById,
  editRobotById,
} from "../controllers/robotCobtrollers/robotsControllers.js";
import routes from "./routes.js";

const {
  getRobotsRoute,
  getRobotRouteById,
  deletRobotRouterById,
  editRobotRouterById,
} = routes;

// eslint-disable-next-line new-cap
const robotRouter = express.Router();

robotRouter.get(getRobotsRoute, getRobots);
robotRouter.get(getRobotRouteById, getRobotById);
robotRouter.delete(deletRobotRouterById, deleteRobotById);
robotRouter.put(editRobotRouterById, editRobotById);

export default robotRouter;
