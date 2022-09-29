import { Router } from 'express';

import { handleAsync } from '../../middlewares/handle-async';

import { ExpositionProductsGetOne } from './exposition-products-get-one/exposition-products-get-one';
import { ExpositionProductsGetMany } from './exposition-products-get-many/exposition-products-get-many';
import { ExpositionProductsGetStock } from './exposition-products-get-stock/exposition-products-get-stock';
import { ExpositionProductsGetStockMany } from './exposition-products-get-stock-many/exposition-products-get-stock-many';

interface ExpositionProductsRouterFactoryDependencies {
  expositionProductsGetOne: ExpositionProductsGetOne;
  expositionProductsGetMany: ExpositionProductsGetMany;
  expositionProductsGetStock: ExpositionProductsGetStock;
  expositionProductsGetStockMany: ExpositionProductsGetStockMany;
}

export const ExpositionProductsRouterFactory = ({
  expositionProductsGetOne,
  expositionProductsGetMany,
  expositionProductsGetStock,
  expositionProductsGetStockMany
}: ExpositionProductsRouterFactoryDependencies) => {
  const expositionProductsRouter = Router();

  expositionProductsRouter.get(
    '/exposition/products',
    handleAsync(expositionProductsGetMany)
  );

  expositionProductsRouter.get(
    '/exposition/products/stock',
    handleAsync(expositionProductsGetStockMany)
  );

  expositionProductsRouter.get(
    '/exposition/products/:productId',
    handleAsync(expositionProductsGetOne)
  );

  expositionProductsRouter.get(
    '/exposition/products/:productId/stock',
    handleAsync(expositionProductsGetStock)
  );

  return expositionProductsRouter;
};
