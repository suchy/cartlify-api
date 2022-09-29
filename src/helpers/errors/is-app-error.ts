import { AppError } from './app-error';

export const isAppError = (error: Error | AppError): error is AppError =>
  (error as AppError).trusted;
