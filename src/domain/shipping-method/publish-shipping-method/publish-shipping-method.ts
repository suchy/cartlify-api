import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { ShippingMethod } from '../shipping-method/shipping-method';
import { ShippingMethodsRepository } from '../shipping-methods-repository';
import { ShippingMethodServiceFactory } from '../shipping-method-service/shipping-method-service';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type publishShippingMethod = (params: {
  context: Context;
  shippingMethodId: string;
}) => Promise<ShippingMethod>;

export type PublishShippingMethodFactory = (dependencies: {
  checkPermissions: checkPermissions;
  shippingMethodsRepository: ShippingMethodsRepository;
  ShippingMethodServiceFactory: ShippingMethodServiceFactory;
  throwNotFoundError: throwNotFoundError;
}) => publishShippingMethod;

export const PublishShippingMethodFactory: PublishShippingMethodFactory = ({
  checkPermissions,
  shippingMethodsRepository,
  ShippingMethodServiceFactory,
  throwNotFoundError
}) => async ({ context, shippingMethodId }) => {
  checkPermissions(context, PERMISSIONS.shippingMethodsWrite);

  const storeId = context.storeId as string;

  const query = { storeId, id: shippingMethodId };

  const shippingMethod = await shippingMethodsRepository.findOne(query);

  if (!shippingMethod) {
    return throwNotFoundError('Shipping method not found.', { storeId });
  }

  const shippingMethodService = ShippingMethodServiceFactory(shippingMethod);

  const publishedShippingMethod = shippingMethodService.publish();

  const isUpdated = await shippingMethodsRepository.update(
    query,
    publishedShippingMethod
  );

  if (!isUpdated) {
    return throwNotFoundError('Shipping method not found', {
      shippingMethodId
    });
  }

  return publishedShippingMethod;
};
