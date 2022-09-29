import { Router } from 'express';

interface ApiRouterFactoryDependencies {
  docsRouter: Router;
  expositionRouter: Router;
  managementRouter: Router;
}

export const ApiRouterFactory = ({
  docsRouter,
  expositionRouter,
  managementRouter
}: ApiRouterFactoryDependencies) => {
  const apiRouter = Router();

  apiRouter.use(docsRouter);

  apiRouter.use(expositionRouter);

  apiRouter.use(managementRouter);

  return apiRouter;
};
