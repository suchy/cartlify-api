import { Logger } from '../../infrastructure/logger';
import { AppError } from './app-error';
import { STATUS_NOT_FOUND } from '../../constants';

interface ThrowNotFoundErrorFactoryDependencies {
  logger: Logger;
}

export type throwNotFoundError = (message: string, details: object) => never;

type ThrowNotFoundErrorFactory = ({
  logger
}: ThrowNotFoundErrorFactoryDependencies) => throwNotFoundError;

export const NotFoundErrorFactory = (message: string, details: object) => {
  const notFoundError = new Error() as AppError;

  notFoundError.name = 'NotFound';
  notFoundError.message = message || 'Path not found';
  notFoundError.statusCode = STATUS_NOT_FOUND;
  notFoundError.statusText = 'not-found';
  notFoundError.trusted = true;
  notFoundError.details = details;

  return notFoundError;
};

export const ThrowNotFoundErrorFactory: ThrowNotFoundErrorFactory = ({
  logger
}) => (message, details) => {
  const error = NotFoundErrorFactory(message, details);
  logger.error(error);
  throw error;
};
