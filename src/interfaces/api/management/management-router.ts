import { Router } from 'express';

import { handleAsync } from '../middlewares/handle-async';
import { setContext } from '../middlewares/set-context';

interface ManagementRouterFactoryDependencies {
  managementOrdersNotesRouter: Router;
  managementOrdersRouter: Router;
  managementPaymentMethodsRouter: Router;
  managementProductsRouter: Router;
  managementShippingMethodsRouter: Router;
  managementStoresRouter: Router;
  setContext: setContext;
  validateAuthToken: any;
}

export const ManagementRouterFactory = ({
  managementOrdersNotesRouter,
  managementOrdersRouter,
  managementPaymentMethodsRouter,
  managementProductsRouter,
  managementShippingMethodsRouter,
  managementStoresRouter,
  setContext,
  validateAuthToken
}: ManagementRouterFactoryDependencies) => {
  const managementRouter = Router();

  managementRouter.use(handleAsync(validateAuthToken));

  managementRouter.use(handleAsync(setContext));

  managementRouter.use(managementOrdersNotesRouter);

  managementRouter.use(managementOrdersRouter);

  managementRouter.use(managementPaymentMethodsRouter);

  managementRouter.use(managementProductsRouter);

  managementRouter.use(managementShippingMethodsRouter);

  managementRouter.use(managementStoresRouter);

  return managementRouter;
};
