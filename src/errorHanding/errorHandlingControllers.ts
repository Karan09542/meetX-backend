import { NextFunction, Request, Response } from "express";
import { sendErrorDev, sendErrorProd } from "./utils";
import { IS_PRODUCTION } from "../config/index";

export const unHandleRoutesController = (
    req: Request,
    res: Response,
) => {
    res.status(404).json({
        status: "fail",
        message: `Route not found? ${req.originalUrl} on this server!`,
    });
}

export const globalErrorHandlingController = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(IS_PRODUCTION) sendErrorProd(err, res);
    else sendErrorDev(err, res);
}