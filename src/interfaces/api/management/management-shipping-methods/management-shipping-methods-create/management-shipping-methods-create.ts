import { RequestHandler } from 'express';

import { createShippingMethod } from '../../../../../domain/shipping-method/create-shipping-method/create-shipping-method';
import { ManagementShippingMethodsCreateResponseFactory } from './management-shipping-methods-create-response';

import { STATUS_CREATED } from '../../../../../constants';
import { ShippingMethod } from '../../../../../domain/shipping-method/shipping-method/shipping-method';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementShippingMethodsCreate = RequestHandler<
  {},
  ReturnType<typeof ManagementShippingMethodsCreateResponseFactory>,
  any,
  RequestQueryOne<ShippingMethod>
>;

type ManagementShippingMethodsCreateFactory = (dependencies: {
  createShippingMethod: createShippingMethod;
}) => ManagementShippingMethodsCreate;

export const ManagementShippingMethodsCreateFactory: ManagementShippingMethodsCreateFactory = ({
  createShippingMethod
}) => async (req, res) => {
  const { context } = res.locals;
  const shippingMethodProps = req.body;
  const { fields } = req.query;

  const shippingMethod = await createShippingMethod({
    context,
    shippingMethodProps
  });

  const response = ManagementShippingMethodsCreateResponseFactory({
    fields,
    shippingMethod
  });

  res.status(STATUS_CREATED).json(response);
};
