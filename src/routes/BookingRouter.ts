import express from "express";
import { validateAuthorizationHeader } from "../validators/userValidator";
import { authorize } from "../controllers/userController";
import { createBooking, getMyBookings } from "../controllers/BookingController";

const BookingRouter = express.Router();

BookingRouter.post("/", validateAuthorizationHeader, authorize, getMyBookings)
BookingRouter.post("/create",validateAuthorizationHeader, authorize, createBooking)

export default BookingRouter;