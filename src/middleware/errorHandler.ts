import { AppError } from "@/utils/AppError.js";
import { NextFunction, Request, Response } from "express";



export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    const statusCode = err instanceof AppError ? err.statusCode: 500;
    const message = err instanceof Error ? err.message : "Internal server error";

    console.error("Error:", err);

    res.status(statusCode).json({
        success: false,
        message: statusCode === 500 ? "Internal Server error" : message,
    })
}