import { NextFunction, Request, Response } from 'express';

import {
  STATUS_NOT_FOUND,
  STATUS_BAD_REQUEST,
  // STATUS_UNAUTHORIZED,
  STATUS_UNPROCESSABLE_ENTITY
} from '../../../constants';

import { AppError } from '../../../helpers/errors/app-error';

import { isAppError } from '../../../helpers/errors/is-app-error';

import { NotFoundErrorFactory } from '../../../helpers/errors/not-found-error';
import { ValidationFailedErrorFactory } from '../../../helpers/errors/validation-failed-error';
import { BadRequestErrorFactory } from '../../../helpers/errors/bad-request-error';
import { InternalServerErrorFactory } from '../../../helpers/errors/internal-server-error';
// import { UnauthorizedErrorFactory } from '../../../helpers/errors/unauthorized-error';

export const handleErrorResponse = async (
  error: AppError | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isApplicationError = isAppError(error);

  const isOpenApiValidationError = !isApplicationError && error.status;

  const isQueryError =
    isOpenApiValidationError &&
    error.status === STATUS_BAD_REQUEST &&
    error.errors?.length &&
    error.errors?.[0]?.path.match(/^\.query/);

  const isUrlParamsError =
    isOpenApiValidationError &&
    error.status === STATUS_BAD_REQUEST &&
    error.errors?.length &&
    error.errors?.[0]?.path.match(/^\.params/);

  const isRequestBodyError =
    isOpenApiValidationError &&
    error.status === STATUS_BAD_REQUEST &&
    error.errors?.length &&
    error.errors?.[0]?.path.match(/^\.body/);

  let response = InternalServerErrorFactory();

  if (isApplicationError) {
    const respondWithErrorDetails = [
      STATUS_UNPROCESSABLE_ENTITY,
      STATUS_NOT_FOUND
    ].includes(error.statusCode);

    const errorDetails = respondWithErrorDetails ? error.details : {};

    response = { ...error, details: errorDetails };
  }

  if (isQueryError) {
    response = BadRequestErrorFactory('Query params are invalid', {
      errors: error.errors
    });
  }

  if (isUrlParamsError) {
    response = BadRequestErrorFactory('Url params are invalid', {
      errors: error.errors
    });
  }

  if (isRequestBodyError) {
    response = ValidationFailedErrorFactory('Request body is invalid', {
      errors: error.errors
    });
  }

  // if (error.statusCode === STATUS_UNAUTHORIZED) {
  //   response = UnauthorizedErrorFactory();
  // }

  if (error.statusCode === STATUS_NOT_FOUND) {
    const details = { path: error.errors?.[0]?.path };
    response = NotFoundErrorFactory('', details);
  }

  // if (error.status === 405) {
  //   res.status(errorResponse.statusCode).json(errorResponse);
  //   return next(error);
  // }

  // @ts-ignore
  const { trusted, level, ...responseBody } = response;
  res.status(response.statusCode).json(responseBody);
  return next(error);
};
