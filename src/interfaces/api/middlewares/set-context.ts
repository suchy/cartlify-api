import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../../infrastructure/logger';

interface SetContextFactoryDependencies {
  logger: Logger;
}

export type setContext = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

type SetContextFactory = (
  dependencies: SetContextFactoryDependencies
) => setContext;

export const SetContextFactory: SetContextFactory = ({ logger }) => async (
  req,
  res,
  next
) => {
  logger.info('Setting context');

  let storeId;

  const storesParamMatch = /\/stores\/[a-zA-Z0-9\-]+\/?/.exec(req.path);

  if (storesParamMatch) {
    storeId = storesParamMatch[0].replace('stores', '').replace(/\//g, '');
  }

  const { userId, roles } = res.locals;

  delete res.locals.userId;
  delete res.locals.roles;

  const context = { storeId, user: { userId, roles } };

  logger.info('Context is set', context);

  res.locals.context = context;

  return next();
};
