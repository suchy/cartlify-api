import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { ShippingMethod } from '../shipping-method/shipping-method';
import { ShippingMethodsRepository } from '../shipping-methods-repository';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type getPublishedShippingMethod = (params: {
  context: Context;
  shippingMethodId: string;
}) => Promise<ShippingMethod>;

export type GetPublishedShippingMethodFactory = (dependencies: {
  checkPermissions: checkPermissions;
  shippingMethodsRepository: ShippingMethodsRepository;
  throwNotFoundError: throwNotFoundError;
}) => getPublishedShippingMethod;

export const GetPublishedShippingMethodFactory: GetPublishedShippingMethodFactory = ({
  checkPermissions,
  shippingMethodsRepository,
  throwNotFoundError
}) => async ({ context, shippingMethodId }) => {
  checkPermissions(context, PERMISSIONS.shippingMethodsRead);

  const storeId = context.storeId as string;

  const query = { storeId, id: shippingMethodId, published: true };

  const publishedShippingMethod = await shippingMethodsRepository.findOne(
    query
  );

  if (!publishedShippingMethod) {
    return throwNotFoundError('Shipping method not found', {
      shippingMethodId
    });
  }

  return publishedShippingMethod;
};
