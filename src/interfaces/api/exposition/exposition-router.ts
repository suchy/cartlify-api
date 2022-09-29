import { Router } from 'express';

import { handleAsync } from '../middlewares/handle-async';
import { setContext } from '../middlewares/set-context';

interface ExpositionRouterFactoryDependencies {
  expositionOrdersRouter: Router;
  expositionPaymentMethodsRouter: Router;
  expositionProductsRouter: Router;
  expositionShippingMethodsRouter: Router;
  setContext: setContext;
  // validateAuthToken: any;
}

export const ExpositionRouterFactory = ({
  expositionOrdersRouter,
  expositionPaymentMethodsRouter,
  expositionProductsRouter,
  expositionShippingMethodsRouter,
  setContext
}: // validateAuthToken
ExpositionRouterFactoryDependencies) => {
  const expositionRouter = Router();

  // expositionRouter.use(handleAsync(validateAuthToken));

  expositionRouter.use(handleAsync(setContext));

  expositionRouter.use(expositionOrdersRouter);

  expositionRouter.use(expositionPaymentMethodsRouter);

  expositionRouter.use(expositionProductsRouter);

  expositionRouter.use(expositionShippingMethodsRouter);

  return expositionRouter;
};
