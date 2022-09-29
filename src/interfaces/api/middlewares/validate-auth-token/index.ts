import { NextFunction, Request, Response } from 'express';
import { Logger } from '../../../../infrastructure/logger';

import { verifyAuthToken } from './verify-auth-token';
import { throwUnauthorizedError } from '../../../../helpers/errors/unauthorized-error';

interface ValidateAuthTokenDependencies {
  logger: Logger;
  throwUnauthorizedError: throwUnauthorizedError;
}

interface AuthToken {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
  'https://cartlify.com/app_meta': {
    roles: {
      [storeId: string]: 'owner' | 'member';
    };
  };
}

export const ValidateAuthTokenFactory = ({
  logger,
  throwUnauthorizedError
}: ValidateAuthTokenDependencies) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('Validating the auth token');

  const authToken = req.headers.authorization?.replace('Bearer ', '');

  try {
    const validToken = (await verifyAuthToken(authToken)) as AuthToken;
    const appMeta = validToken['https://cartlify.com/app_meta'];
    const userId = validToken.sub.replace('auth0|', '');

    res.locals.userId = userId;
    res.locals.roles = appMeta.roles;
  } catch {
    return throwUnauthorizedError();
  }

  return next();
};
