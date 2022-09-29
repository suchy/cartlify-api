import { AppError } from './app-error';
import { isAppError } from './is-app-error';

export const handleError = (error: AppError | Error) => {
  if (isAppError(error)) return;
  console.error(error);
  process.exit(1);
};
