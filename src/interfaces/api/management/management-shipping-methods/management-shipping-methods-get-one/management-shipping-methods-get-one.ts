import { RequestHandler } from 'express';

import { getShippingMethod } from '../../../../../domain/shipping-method/get-shipping-method/get-shipping-method';
import { ManagementShippingMethodsGetOneResponseFactory } from './management-shipping-methods-get-one-response';

import { STATUS_OK } from '../../../../../constants';
import { ShippingMethod } from '../../../../../domain/shipping-method/shipping-method/shipping-method';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementShippingMethodsGetOne = RequestHandler<
  { shippingMethodId: string },
  ReturnType<typeof ManagementShippingMethodsGetOneResponseFactory>,
  any,
  RequestQueryOne<ShippingMethod>
>;

type ManagementShippingMethodsGetOneFactory = (dependencies: {
  getShippingMethod: getShippingMethod;
}) => ManagementShippingMethodsGetOne;

export const ManagementShippingMethodsGetOneFactory: ManagementShippingMethodsGetOneFactory = ({
  getShippingMethod
}) => async (req, res) => {
  const { context } = res.locals;
  const { shippingMethodId } = req.params;
  const { fields } = req.query;

  const shippingMethod = await getShippingMethod({
    context,
    shippingMethodId
  });

  const response = ManagementShippingMethodsGetOneResponseFactory({
    fields,
    shippingMethod
  });

  res.status(STATUS_OK).json(response);
};
