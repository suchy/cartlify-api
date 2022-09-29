import { Logger } from '../../infrastructure/logger';
import { AppError } from './app-error';
import { STATUS_UNAUTHORIZED } from '../../constants';

export type throwUnauthorizedError = () => AppError;

interface ThrowUnauthorizedErrorFactoryDependencies {
  logger: Logger;
}

type ThrowUnauthorizedErrorFactory = ({
  logger
}: ThrowUnauthorizedErrorFactoryDependencies) => throwUnauthorizedError;

export const UnauthorizedErrorFactory = () => {
  const unauthorizedError = new Error() as AppError;

  unauthorizedError.name = 'Unauthorized';
  unauthorizedError.message = 'Authorization token is not valid';
  unauthorizedError.statusCode = STATUS_UNAUTHORIZED;
  unauthorizedError.statusText = 'unauthorized';
  unauthorizedError.trusted = true;

  return unauthorizedError;
};

export const ThrowUnauthorizedErrorFactory: ThrowUnauthorizedErrorFactory = ({
  logger
}) => () => {
  const error = UnauthorizedErrorFactory();
  logger.error(error);
  throw error;
};
