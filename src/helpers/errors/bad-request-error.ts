import { STATUS_BAD_REQUEST } from '../../constants';
import { AppError } from './app-error';

export const BadRequestErrorFactory = (message: string, details: object) => {
  const badRequestError = new Error() as AppError;

  badRequestError.name = 'BadRequest';
  badRequestError.message = message || 'Invalid request';
  badRequestError.statusCode = STATUS_BAD_REQUEST;
  badRequestError.statusText = 'bad-request';
  badRequestError.trusted = true;
  badRequestError.details = details;

  return badRequestError;
};
