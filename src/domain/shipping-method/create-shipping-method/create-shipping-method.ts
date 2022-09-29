import {
  ShippingMethod,
  ShippingMethodFactory
} from '../shipping-method/shipping-method';

import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { ShippingMethodsRepository } from '../shipping-methods-repository';

import { createId } from '../../../helpers/create-id';
import { PERMISSIONS } from '../../../constants';

export type createShippingMethod = (params: {
  context: Context;
  shippingMethodProps: ShippingMethod;
}) => Promise<ShippingMethod>;

export type CreateShippingMethodFactory = (dependencies: {
  checkPermissions: checkPermissions;
  ShippingMethodFactory: ShippingMethodFactory;
  shippingMethodsRepository: ShippingMethodsRepository;
  createId: createId;
}) => createShippingMethod;

export const CreateShippingMethodFactory: CreateShippingMethodFactory = ({
  checkPermissions,
  ShippingMethodFactory,
  shippingMethodsRepository,
  createId
}) => async ({ context, shippingMethodProps }) => {
  checkPermissions(context, PERMISSIONS.shippingMethodsCreate);

  const timestamp = new Date();

  const storeId = context.storeId as string;

  const shippingMethod = ShippingMethodFactory({
    ...shippingMethodProps,
    storeId,
    id: createId(),
    createdAt: timestamp,
    updatedAt: timestamp
  });

  await shippingMethodsRepository.insert(shippingMethod);

  return shippingMethod;
};
