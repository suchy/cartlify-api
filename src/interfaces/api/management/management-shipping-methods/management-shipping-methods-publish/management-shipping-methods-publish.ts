import { RequestHandler } from 'express';

import { publishShippingMethod } from '../../../../../domain/shipping-method/publish-shipping-method/publish-shipping-method';
import { ManagementShippingMethodsPublishResponseFactory } from './management-shipping-methods-publish-response';

import { STATUS_OK } from '../../../../../constants';
import { ShippingMethod } from '../../../../../domain/shipping-method/shipping-method/shipping-method';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementShippingMethodsPublish = RequestHandler<
  { shippingMethodId: string },
  ReturnType<typeof ManagementShippingMethodsPublishResponseFactory>,
  any,
  RequestQueryOne<ShippingMethod>
>;

type ManagementShippingMethodsPublishFactory = (dependencies: {
  publishShippingMethod: publishShippingMethod;
}) => ManagementShippingMethodsPublish;

export const ManagementShippingMethodsPublishFactory: ManagementShippingMethodsPublishFactory = ({
  publishShippingMethod
}) => async (req, res) => {
  const { context } = res.locals;
  const { shippingMethodId } = req.params;
  const { fields } = req.query;

  const shippingMethod = await publishShippingMethod({
    context,
    shippingMethodId
  });

  const response = ManagementShippingMethodsPublishResponseFactory({
    fields,
    shippingMethod
  });

  res.status(STATUS_OK).json(response);
};
