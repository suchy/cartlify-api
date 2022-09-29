import { Logger } from '../../infrastructure/logger';
import { AppError } from './app-error';
import { STATUS_UNPROCESSABLE_ENTITY } from '../../constants';

interface ThrowValidationFailedErrorFactoryDependencies {
  logger: Logger;
}

export type throwValidationFailedError = (
  message: string,
  details: object
) => void;

type ThrowValidationFailedErrorFactory = ({
  logger
}: ThrowValidationFailedErrorFactoryDependencies) => throwValidationFailedError;

export const ValidationFailedErrorFactory = (
  message: string,
  details: object
) => {
  const validationFailedError = new Error() as AppError;

  validationFailedError.name = 'ValidationFailed';
  validationFailedError.message = message || 'Validation failed';
  validationFailedError.trusted = true;
  validationFailedError.statusCode = STATUS_UNPROCESSABLE_ENTITY;
  validationFailedError.statusText = 'unprocessable-entity';
  validationFailedError.details = details;

  return validationFailedError;
};

export const ThrowValidationFailedErrorFactory: ThrowValidationFailedErrorFactory = ({
  logger
}) => (message, details) => {
  const error = ValidationFailedErrorFactory(message, details);
  logger.error(error);
  throw error;
};
