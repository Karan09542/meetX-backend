import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandlingController, unHandleRoutesController } from "./errorHanding/errorHandlingControllers";
import { PublicUserRouter } from "./routes/userRouter";
import { PrivateActivityRouter, PublicActivityRouter } from "./routes/activityRouter";
import BookingRouter from "./routes/BookingRouter";

const app: Express = express();

app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json("बम बम भोले")
})
app.use("/user", PublicUserRouter)
app.use("/activity", PublicActivityRouter)
app.use("/activity", PrivateActivityRouter)
app.use("/booking", BookingRouter)

app.all(/.*/, unHandleRoutesController);
app.use(globalErrorHandlingController);


export default app;