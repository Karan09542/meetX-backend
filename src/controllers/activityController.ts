import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../errorHanding/utils";
import ActivityModel from "../models/activityModel";

const { validationResult } = require("express-validator");

export const addActivityController = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        message: errors.array(),
      });
    }

    const { title, description, location, date, time, category } = req.body;

    await ActivityModel.create({
      title,
      description,
      location,
      date,
      time,
      category,
    });

    res.status(200).json({
      status: "success",
      message: "activity created successfully",
    });
  }
);

export const getActivityController = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    let { page, limit, category }: { page?: number | string; limit?: number | string, category?: string } =
      req.query;
    page = Number(page);
    limit = Number(limit);
    if (!page || page < 1 || isNaN(page)) page = 1;
    if (!limit || limit < 1 || isNaN(limit)) limit = 10;

    const skip = (page - 1) * limit;

    const findQuery = category ? { category } : {};
    const activities = await ActivityModel.find(findQuery).skip(skip).limit(limit);
    res.status(200).json({
      status: "success",
      message: "activities fetched successfully",
      data: activities,
    });
  }
);
