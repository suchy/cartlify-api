import { Router } from 'express';

import { handleAsync } from '../../middlewares/handle-async';

import { ManagementPaymentMethodsCreate } from './management-payment-methods-create/management-payment-methods-create';
import { ManagementPaymentMethodsDelete } from './management-payment-methods-delete/management-payment-methods-delete';
import { ManagementPaymentMethodsGetMany } from './management-payment-methods-get-many/management-payment-methods-get-many';
import { ManagementPaymentMethodsGetOne } from './management-payment-methods-get-one/management-payment-methods-get-one';
import { ManagementPaymentMethodsPublish } from './management-payment-methods-publish/management-payment-methods-publish';
import { ManagementPaymentMethodsUnpublish } from './management-payment-methods-unpublish/management-payment-methods-unpublish';
import { ManagementPaymentMethodsUpdateProviderSettings } from './management-payment-methods-update-provider-settings/management-payment-methods-update-provider-settings';

interface ManagementPaymentMethodsRouterFactoryDependencies {
  managementPaymentMethodsCreate: ManagementPaymentMethodsCreate;
  managementPaymentMethodsDelete: ManagementPaymentMethodsDelete;
  managementPaymentMethodsGetMany: ManagementPaymentMethodsGetMany;
  managementPaymentMethodsGetOne: ManagementPaymentMethodsGetOne;
  managementPaymentMethodsPublish: ManagementPaymentMethodsPublish;
  managementPaymentMethodsUnpublish: ManagementPaymentMethodsUnpublish;
  managementPaymentMethodsUpdateProviderSettings: ManagementPaymentMethodsUpdateProviderSettings;
}

export const ManagementPaymentMethodsRouterFactory = ({
  managementPaymentMethodsCreate,
  managementPaymentMethodsDelete,
  managementPaymentMethodsGetMany,
  managementPaymentMethodsGetOne,
  managementPaymentMethodsPublish,
  managementPaymentMethodsUnpublish,
  managementPaymentMethodsUpdateProviderSettings
}: ManagementPaymentMethodsRouterFactoryDependencies) => {
  const paymentMethodsRouter = Router();

  paymentMethodsRouter.post(
    '/management/stores/:storeId/payment-methods',
    handleAsync(managementPaymentMethodsCreate)
  );

  paymentMethodsRouter.delete(
    '/management/stores/:storeId/payment-methods/:paymentMethodId',
    handleAsync(managementPaymentMethodsDelete)
  );

  paymentMethodsRouter.get(
    '/management/stores/:storeId/payment-methods',
    handleAsync(managementPaymentMethodsGetMany)
  );

  paymentMethodsRouter.get(
    '/management/stores/:storeId/payment-methods/:paymentMethodId',
    handleAsync(managementPaymentMethodsGetOne)
  );

  paymentMethodsRouter.patch(
    '/management/stores/:storeId/payment-methods/:paymentMethodId/publish',
    handleAsync(managementPaymentMethodsPublish)
  );

  paymentMethodsRouter.patch(
    '/management/stores/:storeId/payment-methods/:paymentMethodId/unpublish',
    handleAsync(managementPaymentMethodsUnpublish)
  );

  paymentMethodsRouter.patch(
    '/management/stores/:storeId/payment-methods/:paymentMethodId/provider-settings',
    handleAsync(managementPaymentMethodsUpdateProviderSettings)
  );

  return paymentMethodsRouter;
};
