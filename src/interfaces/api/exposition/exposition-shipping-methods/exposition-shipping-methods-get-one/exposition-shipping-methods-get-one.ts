import { RequestHandler } from 'express';

import { getPublishedShippingMethod } from '../../../../../domain/shipping-method/get-published-shipping-method/get-published-shipping-method';
import { ExpositionShippingMethodsGetOneResponseFactory } from './exposition-shipping-methods-get-one-response';

import { STATUS_OK } from '../../../../../constants';
import { ShippingMethod } from '../../../../../domain/shipping-method/shipping-method/shipping-method';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ExpositionShippingMethodsGetOne = RequestHandler<
  { shippingMethodId: string },
  ReturnType<typeof ExpositionShippingMethodsGetOneResponseFactory>,
  any,
  RequestQueryOne<ShippingMethod>
>;

type ExpositionShippingMethodsGetOneFactory = (dependencies: {
  getPublishedShippingMethod: getPublishedShippingMethod;
}) => ExpositionShippingMethodsGetOne;

export const ExpositionShippingMethodsGetOneFactory: ExpositionShippingMethodsGetOneFactory = ({
  getPublishedShippingMethod
}) => async (req, res) => {
  const { context } = res.locals;
  const { shippingMethodId } = req.params;
  const { fields } = req.query;

  const shippingMethod = await getPublishedShippingMethod({
    context,
    shippingMethodId
  });

  const response = ExpositionShippingMethodsGetOneResponseFactory({
    fields,
    shippingMethod
  });

  res.status(STATUS_OK).json(response);
};
