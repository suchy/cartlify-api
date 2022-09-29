import { Router } from 'express';

import { handleAsync } from '../../middlewares/handle-async';

import { ExpositionOrdersCreate } from './exposition-orders-create/exposition-orders-create';
import { ExpositionOrdersGetOne } from './exposition-orders-get-one/exposition-orders-get-one';

interface ExpositionOrdersRouterFactoryDependencies {
  expositionOrdersCreate: ExpositionOrdersCreate;
  expositionOrdersGetOne: ExpositionOrdersGetOne;
}

export const ExpositionOrdersRouterFactory = ({
  expositionOrdersCreate,
  expositionOrdersGetOne
}: ExpositionOrdersRouterFactoryDependencies) => {
  const expositionOrdersRouter = Router();

  expositionOrdersRouter.post(
    '/exposition/orders',
    handleAsync(expositionOrdersCreate)
  );

  expositionOrdersRouter.get(
    '/exposition/orders/:orderId',
    handleAsync(expositionOrdersGetOne)
  );

  return expositionOrdersRouter;
};
