import { RequestHandler } from 'express';

import { unpublishShippingMethod } from '../../../../../domain/shipping-method/unpublish-shipping-method/unpublish-shipping-method';
import { ManagementShippingMethodsUnpublishResponseFactory } from './management-shipping-methods-unpublish-response';

import { STATUS_OK } from '../../../../../constants';
import { ShippingMethod } from '../../../../../domain/shipping-method/shipping-method/shipping-method';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementShippingMethodsUnpublish = RequestHandler<
  { shippingMethodId: string },
  ReturnType<typeof ManagementShippingMethodsUnpublishResponseFactory>,
  any,
  RequestQueryOne<ShippingMethod>
>;

type ManagementShippingMethodsUnpublishFactory = (dependencies: {
  unpublishShippingMethod: unpublishShippingMethod;
}) => ManagementShippingMethodsUnpublish;

export const ManagementShippingMethodsUnpublishFactory: ManagementShippingMethodsUnpublishFactory = ({
  unpublishShippingMethod
}) => async (req, res) => {
  const { context } = res.locals;
  const { shippingMethodId } = req.params;
  const { fields } = req.query;

  const shippingMethod = await unpublishShippingMethod({
    context,
    shippingMethodId
  });

  const response = ManagementShippingMethodsUnpublishResponseFactory({
    fields,
    shippingMethod
  });

  res.status(STATUS_OK).json(response);
};
