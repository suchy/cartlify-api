import { Logger } from '../../infrastructure/logger';
import { AppError } from './app-error';
import { STATUS_FORBIDDEN } from '../../constants';

interface ThrowForbiddenErrorFactoryDependencies {
  logger: Logger;
}

export type throwForbiddenError = () => void;

type ThrowForbiddenErrorFactory = ({
  logger
}: ThrowForbiddenErrorFactoryDependencies) => throwForbiddenError;

export const ForbiddenErrorFactory = () => {
  const forbiddenError = new Error() as AppError;

  forbiddenError.name = 'Forbidden';
  forbiddenError.message = 'Access to resource is forbidden';
  forbiddenError.statusCode = STATUS_FORBIDDEN;
  forbiddenError.statusText = 'forbidden';
  forbiddenError.trusted = true;

  return forbiddenError;
};

export const ThrowForbiddenErrorFactory: ThrowForbiddenErrorFactory = ({
  logger
}) => () => {
  const error = ForbiddenErrorFactory();
  logger.error(error);
  throw error;
};
