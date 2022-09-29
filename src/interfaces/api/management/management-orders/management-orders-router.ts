import { Router } from 'express';

import { handleAsync } from '../../middlewares/handle-async';

import { ManagementOrdersChangeShippingMethod } from './management-orders-change-shipping-method/management-orders-change-shipping-method';
import { ManagementOrdersChangeStatus } from './management-orders-change-status/management-orders-change-status';
import { ManagementOrdersGetMany } from './management-orders-get-many/management-orders-get-many';
import { ManagementOrdersGetOne } from './management-orders-get-one/management-orders-get-one';

interface ManagementOrdersRouterFactoryDependencies {
  managementOrdersChangeShippingMethod: ManagementOrdersChangeShippingMethod;
  managementOrdersChangeStatus: ManagementOrdersChangeStatus;
  managementOrdersGetMany: ManagementOrdersGetMany;
  managementOrdersGetOne: ManagementOrdersGetOne;
}

export const ManagementOrdersRouterFactory = ({
  managementOrdersChangeShippingMethod,
  managementOrdersChangeStatus,
  managementOrdersGetMany,
  managementOrdersGetOne
}: ManagementOrdersRouterFactoryDependencies) => {
  const managementOrdersRouter = Router();

  managementOrdersRouter.patch(
    '/management/stores/:storeId/orders/:orderId/shipping-method',
    handleAsync(managementOrdersChangeShippingMethod)
  );

  managementOrdersRouter.patch(
    '/management/stores/:storeId/orders/:orderId/status',
    handleAsync(managementOrdersChangeStatus)
  );

  managementOrdersRouter.get(
    '/management/stores/:storeId/orders',
    handleAsync(managementOrdersGetMany)
  );

  managementOrdersRouter.get(
    '/management/stores/:storeId/orders/:orderId',
    handleAsync(managementOrdersGetOne)
  );

  return managementOrdersRouter;
};
