import { RequestHandler } from 'express';

import { deleteShippingMethod } from '../../../../../domain/shipping-method/delete-shipping-method/delete-shipping-method';

import { STATUS_NO_CONTENT } from '../../../../../constants';

export type ManagementShippingMethodsDelete = RequestHandler<
  { shippingMethodId: string },
  {},
  any,
  any
>;

type ManagementShippingMethodsDeleteFactory = (dependencies: {
  deleteShippingMethod: deleteShippingMethod;
}) => ManagementShippingMethodsDelete;

export const ManagementShippingMethodsDeleteFactory: ManagementShippingMethodsDeleteFactory = ({
  deleteShippingMethod
}) => async (req, res) => {
  const { context } = res.locals;
  const { shippingMethodId } = req.params;

  await deleteShippingMethod({
    context,
    shippingMethodId
  });

  res.status(STATUS_NO_CONTENT).json();
};
