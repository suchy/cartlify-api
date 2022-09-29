import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { ShippingMethod } from '../shipping-method/shipping-method';
import { ShippingMethodsRepository } from '../shipping-methods-repository';
import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type getShippingMethod = (params: {
  context: Context;
  shippingMethodId: string;
}) => Promise<ShippingMethod>;

export type GetShippingMethodFactory = (dependencies: {
  checkPermissions: checkPermissions;
  shippingMethodsRepository: ShippingMethodsRepository;
  throwNotFoundError: throwNotFoundError;
}) => getShippingMethod;

export const GetShippingMethodFactory: GetShippingMethodFactory = ({
  checkPermissions,
  shippingMethodsRepository,
  throwNotFoundError
}) => async ({ context, shippingMethodId }) => {
  checkPermissions(context, PERMISSIONS.shippingMethodsRead);

  const storeId = context.storeId as string;

  const query = { storeId, id: shippingMethodId };

  const shippingMethod = await shippingMethodsRepository.findOne(query);

  if (!shippingMethod) {
    return throwNotFoundError('Shipping method not found', {
      shippingMethodId
    });
  }

  return shippingMethod;
};
