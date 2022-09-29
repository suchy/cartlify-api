import { STATUS_INTERNAL_ERROR } from '../../constants';
import { AppError } from './app-error';

export const InternalServerErrorFactory = () => {
  const internalServerError = new Error() as AppError;

  internalServerError.name = 'InternalServerError';
  internalServerError.message = 'Something goes wrong';
  internalServerError.statusCode = STATUS_INTERNAL_ERROR;
  internalServerError.statusText = 'internal-server-error';
  internalServerError.trusted = true;

  return internalServerError;
};
