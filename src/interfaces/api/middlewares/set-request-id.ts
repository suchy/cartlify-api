import { NextFunction, Request, Response } from 'express';
import rTracer from 'cls-rtracer';

export const setRequestId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestId = rTracer.id() as string;
  res.locals.requestId = requestId;
  res.append('x-request-id', requestId);
  next();
};
