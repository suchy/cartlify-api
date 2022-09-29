import { NextFunction, Request, Response } from 'express';
import { Logger } from '../../../infrastructure/logger';

const NANOSECONDS_IN_MILLISECOND = 1000000;
const MILISECONS_IN_SECOND = 1000;
const RESPONSE_TIME_DIGITS_PRECISION = 3;

const getResponseTime = ([seconds, nanoseconds]: [number, number]) =>
  (
    seconds * MILISECONS_IN_SECOND +
    nanoseconds / NANOSECONDS_IN_MILLISECOND
  ).toFixed(RESPONSE_TIME_DIGITS_PRECISION);

interface LogRequestFactoryDependencies {
  logger: Logger;
}

export const LogRequestFactory = ({
  logger
}: LogRequestFactoryDependencies) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = { params: req.params, query: req.query, body: req.body };

  logger.info(`${req.method} ${req.path}`, params);

  const startTime = process.hrtime();

  res.on('finish', () => {
    const finishTime = process.hrtime(startTime);
    const responseTime = getResponseTime(finishTime);

    logger.info(`Responded in ${responseTime}ms with status ${res.statusCode}`);
  });

  next();
};
