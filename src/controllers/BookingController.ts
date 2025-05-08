import { NextFunction, Request, Response } from "express";
import { AppError } from "../errorHanding/AppError";
import ActivityModel from "../models/activityModel";
import BookingModel from "../models/BookingModel";
import { CatchAsync } from "../errorHanding/utils";

export const createBooking = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { activityId } = req.body;
    if (!activityId) {
      return next(new AppError("Please provide activity id", 400));
    }
    const userId = req.userId;

    const activity = await ActivityModel.findById(activityId);
    if (!activity) {
      return next(new AppError("Activity not found", 404));
    }

    const existingBooking = await BookingModel.findOne({ activityId, userId });
    if (existingBooking) {
      return next(new AppError("You have already booked this activity", 400));
    }

    const booking = await BookingModel.create({
      activityId,
      userId,
    });

    res.status(201).json({
      status: "success",
      message: "Activity booked successfully",
      data: booking,
    });
  }
);

// Get all bookings for a user
export const getMyBookings = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const bookings = await BookingModel.find({ userId }).populate("activityId");

    res.status(200).json({
      status: "success",
      data: bookings,
    });
  }
);
