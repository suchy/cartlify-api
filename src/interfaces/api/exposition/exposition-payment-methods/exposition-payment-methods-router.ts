import { Router } from 'express';

import { handleAsync } from '../../middlewares/handle-async';

import { ExpositionPaymentMethodsGetMany } from '../exposition-payment-methods/exposition-payment-methods-get-many/exposition-payment-methods-get-many';
import { ExpositionPaymentMethodsGetOne } from '../exposition-payment-methods/exposition-payment-methods-get-one/exposition-payment-methods-get-one';

interface ExpositionPaymentMethodsRouterFactoryDependencies {
  expositionPaymentMethodsGetMany: ExpositionPaymentMethodsGetMany;
  expositionPaymentMethodsGetOne: ExpositionPaymentMethodsGetOne;
}

export const ExpositionPaymentMethodsRouterFactory = ({
  expositionPaymentMethodsGetMany,
  expositionPaymentMethodsGetOne
}: ExpositionPaymentMethodsRouterFactoryDependencies) => {
  const expositionPaymentMethodsRouter = Router();

  expositionPaymentMethodsRouter.get(
    '/exposition/stores/:storeId/payment-methods',
    handleAsync(expositionPaymentMethodsGetMany)
  );

  expositionPaymentMethodsRouter.get(
    '/exposition/stores/:storeId/payment-methods/:paymentMethodId',
    handleAsync(expositionPaymentMethodsGetOne)
  );

  return expositionPaymentMethodsRouter;
};
