import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { Credentials } from "./types.js";
import environment from "../../loadEnvironment.js";
import CustomError from "../../../CustomError/CustomError.js";
import User from "../../../database/models/User.js";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as Credentials;
  const { jwtSecret } = environment;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      const error = new CustomError(
        "Username not found",
        401,
        "Wrong credentials"
      );
      next(error);
      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      const error = new CustomError(
        "Password is incorrect",
        401,
        "Wrong credentials"
      );
      next(error);
      return;
    }

    const token = jwt.sign({ username, id: user._id }, jwtSecret, {
      expiresIn: "2d",
    });

    res.status(200).json({ accessToken: token });
  } catch (error: unknown) {
    next(error);
  }
};
