import { Router } from 'express';

import { handleAsync } from '../../middlewares/handle-async';

import { ExpositionShippingMethodsGetMany } from '../exposition-shipping-methods/exposition-shipping-methods-get-many/exposition-shipping-methods-get-many';
import { ExpositionShippingMethodsGetOne } from '../exposition-shipping-methods/exposition-shipping-methods-get-one/exposition-shipping-methods-get-one';

interface ExpositionShippingMethodsRouterDependencies {
  expositionShippingMethodsGetMany: ExpositionShippingMethodsGetMany;
  expositionShippingMethodsGetOne: ExpositionShippingMethodsGetOne;
}

export const ExpositionShippingMethodsRouterFactory = ({
  expositionShippingMethodsGetMany,
  expositionShippingMethodsGetOne
}: ExpositionShippingMethodsRouterDependencies) => {
  const expositionShippingMethodsRouter = Router();

  expositionShippingMethodsRouter.get(
    '/exposition/stores/:storeId/shipping-methods',
    handleAsync(expositionShippingMethodsGetMany)
  );

  expositionShippingMethodsRouter.get(
    '/exposition/stores/:storeId/shipping-methods/:shippingMethodId',
    handleAsync(expositionShippingMethodsGetOne)
  );

  return expositionShippingMethodsRouter;
};
