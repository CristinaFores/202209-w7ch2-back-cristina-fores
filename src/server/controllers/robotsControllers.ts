import "../loadEnvironment.js";
import debug from "debug";
import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import CustomError from "../../CustomError/CustomError.js";
import Robot from "../../database/models/Robot.js";

const token = process.env.TOKEN;

export const getRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    debug("Request /robots");
    const robots = await Robot.find();

    res.status(200).json({ robots });
  } catch (error: unknown) {
    next(
      new CustomError(
        (error as Error).message,
        500,
        `there was a server error try again later`
      )
    );
  }
};

export const getRobotById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idRobot } = req.params;

  try {
    debug("Request /robots/robot");
    if (!mongoose.isValidObjectId(idRobot)) {
      throw new CustomError(`The ${idRobot} no valid`, 404, `The id no valid`);
    }

    const robot = await Robot.findById(idRobot);
    res.status(200).json({ robots: robot });
  } catch (error: unknown) {
    next(
      new CustomError(
        (error as Error).message,
        (error as CustomError).status,
        (error as CustomError).publicMessage
      )
    );
  }
};

export const deleteRobotById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const receivedToken = req.query.token;
  const { idRobot } = req.params;

  try {
    if (receivedToken !== token) {
      throw new CustomError("Bad token", 404, "You provided the wrong token");
    }

    if (!mongoose.isValidObjectId(idRobot)) {
      throw new CustomError(`The ${idRobot} no valid`, 404, `The id no valid`);
    }

    const robotDelet = await Robot.findByIdAndDelete(idRobot);
    res.status(200).json({ ...robotDelet });
  } catch (error: unknown) {
    next(error);
  }
};

interface EditRobotByIdBody {
  name: string;
  image: string;
  speed: number;
  strength: number;
  createdOn: string;
  _id?: string;
}

export const editRobotById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenEdit = req.query.token;
  const { idRobot } = req.params;
  const editRobot = req.body as EditRobotByIdBody;

  try {
    if (tokenEdit !== token) {
      throw new CustomError(
        "Bad token",
        404,
        "You provided the wrong token method put"
      );
    }

    if (!mongoose.isValidObjectId(idRobot)) {
      throw new CustomError(
        `The ${idRobot} no valid`,
        404,
        `The id no valid put`
      );
    }

    const robotEdit = await Robot.findByIdAndUpdate(idRobot, editRobot, {
      returnDocument: "after",
    });
    res.status(200).json({ robot: robotEdit });
  } catch (error: unknown) {
    next(error);
  }
};
