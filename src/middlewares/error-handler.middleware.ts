import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const randomId = Math.random().toString(36).substring(7);
  console.error(error);
  res.status(500).send({
    message: "Something went wrong",
    error: error.message,
    code: "internal_server_error",
    error_id: randomId,
  });
};
