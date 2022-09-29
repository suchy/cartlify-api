import { RequestHandler } from 'express';

import { changeShippingMethod } from '../../../../../domain/shipping-method/change-shipping-method/change-shipping-method';
import { ManagementShippingMethodsUpdateResponseFactory } from './management-shipping-methods-update-response';

import { STATUS_OK } from '../../../../../constants';
import { ShippingMethod } from '../../../../../domain/shipping-method/shipping-method/shipping-method';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementShippingMethodsUpdate = RequestHandler<
  { shippingMethodId: string },
  ReturnType<typeof ManagementShippingMethodsUpdateResponseFactory>,
  any,
  RequestQueryOne<ShippingMethod>
>;

type ManagementShippingMethodsUpdateFactory = (dependencies: {
  changeShippingMethod: changeShippingMethod;
}) => ManagementShippingMethodsUpdate;

export const ManagementShippingMethodsUpdateFactory: ManagementShippingMethodsUpdateFactory = ({
  changeShippingMethod
}) => async (req, res) => {
  const { context } = res.locals;
  const { shippingMethodId } = req.params;
  const shippingMethodProps = req.body;
  const { fields } = req.query;

  const shippingMethod = await changeShippingMethod({
    context,
    shippingMethodId,
    shippingMethodProps
  });

  const response = ManagementShippingMethodsUpdateResponseFactory({
    fields,
    shippingMethod
  });

  res.status(STATUS_OK).json(response);
};
