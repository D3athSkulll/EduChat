import { Request, Response, NextFunction } from "express";

import { AppError } from "../utils/AppError";

export const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    if( error instanceof AppError){
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }

    console.error(error);
    
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });

};