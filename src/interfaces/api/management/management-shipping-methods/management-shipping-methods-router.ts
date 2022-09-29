import { Router } from 'express';

import { ManagementShippingMethodsCreate } from './management-shipping-methods-create/management-shipping-methods-create';
import { ManagementShippingMethodsDelete } from './management-shipping-methods-delete/management-shipping-methods-delete';
import { ManagementShippingMethodsGetMany } from './management-shipping-methods-get-many/management-shipping-methods-get-many';
import { ManagementShippingMethodsGetOne } from './management-shipping-methods-get-one/management-shipping-methods-get-one';
import { ManagementShippingMethodsPublish } from './management-shipping-methods-publish/management-shipping-methods-publish';
import { ManagementShippingMethodsUnpublish } from './management-shipping-methods-unpublish/management-shipping-methods-unpublish';
import { ManagementShippingMethodsUpdate } from './management-shipping-methods-update/management-shipping-methods-update';

import { handleAsync } from '../../middlewares/handle-async';

interface ShippingMethodsRouterDependencies {
  managementShippingMethodsCreate: ManagementShippingMethodsCreate;
  managementShippingMethodsDelete: ManagementShippingMethodsDelete;
  managementShippingMethodsGetMany: ManagementShippingMethodsGetMany;
  managementShippingMethodsGetOne: ManagementShippingMethodsGetOne;
  managementShippingMethodsPublish: ManagementShippingMethodsPublish;
  managementShippingMethodsUnpublish: ManagementShippingMethodsUnpublish;
  managementShippingMethodsUpdate: ManagementShippingMethodsUpdate;
}

export const ManagementShippingMethodsRouterFactory = ({
  managementShippingMethodsCreate,
  managementShippingMethodsDelete,
  managementShippingMethodsGetMany,
  managementShippingMethodsGetOne,
  managementShippingMethodsPublish,
  managementShippingMethodsUnpublish,
  managementShippingMethodsUpdate
}: ShippingMethodsRouterDependencies) => {
  const shippingMethodsRouter = Router();

  shippingMethodsRouter.post(
    '/management/stores/:storeId/shipping-methods',
    handleAsync(managementShippingMethodsCreate)
  );

  shippingMethodsRouter.delete(
    '/management/stores/:storeId/shipping-methods/:shippingMethodId',
    handleAsync(managementShippingMethodsDelete)
  );

  shippingMethodsRouter.get(
    '/management/stores/:storeId/shipping-methods',
    handleAsync(managementShippingMethodsGetMany)
  );

  shippingMethodsRouter.get(
    '/management/stores/:storeId/shipping-methods/:shippingMethodId',
    handleAsync(managementShippingMethodsGetOne)
  );

  shippingMethodsRouter.patch(
    '/management/stores/:storeId/shipping-methods/:shippingMethodId/publish',
    handleAsync(managementShippingMethodsPublish)
  );

  shippingMethodsRouter.patch(
    '/management/stores/:storeId/shipping-methods/:shippingMethodId/unpublish',
    handleAsync(managementShippingMethodsUnpublish)
  );

  shippingMethodsRouter.patch(
    '/management/stores/:storeId/shipping-methods/:shippingMethodId',
    handleAsync(managementShippingMethodsUpdate)
  );

  return shippingMethodsRouter;
};
