import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application, RequestHandler, Router } from 'express';
import helmet from 'helmet';
import rTracer from 'cls-rtracer';
import * as OpenApiValidator from 'express-openapi-validator';

import { handleAsync } from './middlewares/handle-async';
import { handleErrorResponse } from './middlewares/handle-error-response';
import { setRequestId } from './middlewares/set-request-id';

interface ApiFactoryDependencies {
  apiRouter: Router;
  logRequest: RequestHandler;
  apiSchema: object;
}

export const ApiFactory = ({
  apiRouter,
  logRequest,
  apiSchema
}: ApiFactoryDependencies) => {
  const api: Application = express();

  api.use(helmet());

  api.use(rTracer.expressMiddleware());

  api.use(setRequestId);

  api.use(bodyParser.json());

  api.use(cors());

  api.use(handleAsync(logRequest));

  api.use(
    OpenApiValidator.middleware({
      // @ts-ignore-line
      apiSpec: apiSchema,
      validateRequests: true,
      validateResponses: false,
      validateSecurity: false,
      ignorePaths: /^\/(docs\/?.*)|(docs\/schema\.json)|(\/oauth2-redirect\.html)$/
    })
  );

  api.use(apiRouter);

  api.use(handleErrorResponse);

  return api;
};
