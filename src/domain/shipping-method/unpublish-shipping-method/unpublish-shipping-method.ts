import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { ShippingMethod } from '../shipping-method/shipping-method';
import { ShippingMethodsRepository } from '../shipping-methods-repository';
import { ShippingMethodServiceFactory } from '../shipping-method-service/shipping-method-service';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type unpublishShippingMethod = (params: {
  context: Context;
  shippingMethodId: string;
}) => Promise<ShippingMethod>;

export type UnpublishShippingMethodFactory = (dependencies: {
  checkPermissions: checkPermissions;
  shippingMethodsRepository: ShippingMethodsRepository;
  ShippingMethodServiceFactory: ShippingMethodServiceFactory;
  throwNotFoundError: throwNotFoundError;
}) => unpublishShippingMethod;

export const UnpublishShippingMethodFactory: UnpublishShippingMethodFactory = ({
  checkPermissions,
  shippingMethodsRepository,
  ShippingMethodServiceFactory,
  throwNotFoundError
}) => async ({ context, shippingMethodId }) => {
  checkPermissions(context, PERMISSIONS.shippingMethodsWrite);

  const storeId = context.storeId;

  const query = { storeId, id: shippingMethodId };

  const shippingMethod = await shippingMethodsRepository.findOne(query);

  if (!shippingMethod) {
    return throwNotFoundError('Shipping method not found.', { storeId });
  }

  const shippingMethodService = ShippingMethodServiceFactory(shippingMethod);

  const unpublishedShippingMethod = shippingMethodService.unpublish();

  const isUpdated = await shippingMethodsRepository.update(
    query,
    unpublishedShippingMethod
  );

  if (!isUpdated) {
    return throwNotFoundError('Shipping method not found', {
      shippingMethodId
    });
  }

  return unpublishedShippingMethod;
};
