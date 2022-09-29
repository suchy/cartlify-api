import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import {
  ShippingMethodServiceFactory,
  UpdatableShippingMethodProps
} from '../shipping-method-service/shipping-method-service';

import { ShippingMethod } from '../shipping-method/shipping-method';
import { ShippingMethodsRepository } from '../shipping-methods-repository';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type changeShippingMethod = (params: {
  context: Context;
  shippingMethodId: string;
  shippingMethodProps: UpdatableShippingMethodProps;
}) => Promise<ShippingMethod>;

export type ChangeShippingMethodFactory = (dependencies: {
  checkPermissions: checkPermissions;
  shippingMethodsRepository: ShippingMethodsRepository;
  ShippingMethodServiceFactory: ShippingMethodServiceFactory;
  throwNotFoundError: throwNotFoundError;
}) => changeShippingMethod;

export const ChangeShippingMethodFactory: ChangeShippingMethodFactory = ({
  checkPermissions,
  shippingMethodsRepository,
  ShippingMethodServiceFactory,
  throwNotFoundError
}) => async ({ context, shippingMethodId, shippingMethodProps }) => {
  checkPermissions(context, PERMISSIONS.shippingMethodsWrite);

  const storeId = context.storeId as string;

  const query = { storeId, id: shippingMethodId };

  const shippingMethod = await shippingMethodsRepository.findOne(query);

  if (!shippingMethod) {
    return throwNotFoundError('Shipping method not found.', {
      shippingMethodId
    });
  }

  const ShippingMethodService = ShippingMethodServiceFactory(shippingMethod);

  const updatedShippingMethod = ShippingMethodService.update(
    shippingMethodProps
  );

  const isUpdated = await shippingMethodsRepository.update(
    query,
    updatedShippingMethod
  );

  if (!isUpdated) {
    return throwNotFoundError('Shipping method not found.', {
      shippingMethodId
    });
  }

  return updatedShippingMethod;
};
