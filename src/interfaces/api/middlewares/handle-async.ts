import { NextFunction, Request, RequestHandler, Response } from 'express';

export const handleAsync = (fn: RequestHandler<any, any, any, any>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise.resolve(fn(req, res, next)).catch(next);
