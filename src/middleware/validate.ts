import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodType } from "zod";
import { AppError } from "@/utils/AppError.js";

export const validate = (schema: ZodType): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const issues = result.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ");
      return next(new AppError(`Validation failed: ${issues}`, 400));
    }

    const parsed = result.data as {
        body: unknown;
        query: unknown;
        params: unknown;
    }

    req.body = parsed.body;
    req.query = parsed.query as Request["query"];
    req.params = parsed.params as Request["params"];
    next();
  };
};