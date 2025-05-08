import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../errorHanding/utils";
import UserModel from "../models/userModel";
import jwt from "jsonwebtoken";
import util from "util";
import { IS_PRODUCTION } from "../config";
import { AppError } from "../errorHanding/AppError";
const { validationResult } = require("express-validator");

type DecodedToken = {
  id: string;
};
const isSecure = IS_PRODUCTION;
async function signAccessToken(userId: string) {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: "15m",
  });
}
async function signRefreshToken(userId: string) {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "90d",
  });
}
function setCookies(res: Response, token: string) {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: isSecure,
    sameSite: isSecure ? "none" : "lax",
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  });
}

declare global {
  namespace Express {
    interface Request {
      userId?: string; 
      user?: any; 
    }
  }
}

export const authorize = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("NOT_LOGGED_IN", 401));
    }

    let decoded: DecodedToken;

    try {
      decoded = await new Promise<DecodedToken>((resolve, reject) => {
        jwt.verify(
          token,
          process.env.JWT_ACCESS_SECRET as string,
          (err, decodedToken) => {
            if (err) {
              reject(new AppError("NOT_LOGGED_IN", 401)); // Token verification failed
            } else {
              resolve(decodedToken as DecodedToken);
            }
          }
        );
      });
    } catch (err) {
      return next(err); // Catch and handle the error from the Promise
    }

    req.userId = decoded.id;
    next();
  }
);

export const userSignupController = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        message: errors.array(),
      });
    }
    const { name, email, phoneNumber, password, confirmPassword } = req.body;

    const user = await UserModel.findOne({ $or: [{ email }, { phoneNumber }] });
    if (user) {
      return res.status(400).json({
        status: "fail",
        message: "Please check your email or phone number",
      });
    }

    await UserModel.create({
      name,
      email,
      phoneNumber,
      password,
      confirmPassword,
    });

    res.status(200).json({
      status: "success",
      message: "account created successfully",
    });
  }
);

export const userLoginController = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        message: errors.array(),
      });
    }
    const { email, phoneNumber, password } = req.body;
    const user = await UserModel.findOne({ $or: [{ email }, { phoneNumber }] }).select("+password");
    
    if (!user) {
      return next(new AppError("Please check your email or phone number", 400));
    }
    
    if (!(await user.isCorrectPassword(password))) {
      return next(new AppError("Please check your password", 400));
    }

    const accessToken = await signAccessToken(user._id as string);
    const refreshToken = await signRefreshToken(user._id as string);

    setCookies(res, refreshToken);
    res.status(200).json({
      status: "success",
      message: "login successful",
      accessToken,
    });
  }
);

export const getUserController = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        message: errors.array(),
      });
    }

    const userId = req.userId;
    const user = await UserModel.findById(userId);
    if(!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({
      status: "success",
      user,
    });
  }
);
