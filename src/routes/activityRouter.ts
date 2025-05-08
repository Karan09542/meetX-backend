import express from "express";
import { addActivityController, getActivityController } from "../controllers/activityController";
import { activityValidator } from "../validators/activityValidator";

const PublicActivityRouter = express.Router()
PublicActivityRouter.get("/", getActivityController)

const PrivateActivityRouter = express.Router()
PrivateActivityRouter.post("/add",activityValidator, addActivityController)

export { PublicActivityRouter, PrivateActivityRouter }