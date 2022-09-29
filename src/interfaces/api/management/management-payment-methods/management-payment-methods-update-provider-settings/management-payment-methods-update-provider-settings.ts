import { RequestHandler } from 'express';

import { updatePaymentMethodProviderSettings } from '../../../../../domain/payment-method/update-payment-method-provider-settings/update-payment-method-provider-settings';
import { ManagementPaymentMethodsUpdateProviderSettingsResponseFactory } from './management-payment-methods-update-provider-settings-response';

import { STATUS_OK } from '../../../../../constants';
import { PaymentMethod } from '../../../../../domain/payment-method/payment-method/payment-method';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementPaymentMethodsUpdateProviderSettings = RequestHandler<
  { paymentMethodId: string },
  ReturnType<
    typeof ManagementPaymentMethodsUpdateProviderSettingsResponseFactory
  >,
  any,
  RequestQueryOne<PaymentMethod>
>;

type ManagementPaymentMethodsUpdateProviderSettingsFactory = (dependencies: {
  updatePaymentMethodProviderSettings: updatePaymentMethodProviderSettings;
}) => ManagementPaymentMethodsUpdateProviderSettings;

export const ManagementPaymentMethodsUpdateProviderSettingsFactory: ManagementPaymentMethodsUpdateProviderSettingsFactory = ({
  updatePaymentMethodProviderSettings
}) => async (req, res) => {
  const { context } = res.locals;
  const { paymentMethodId } = req.params;
  const paymentMethodProviderSettings = req.body;
  const { fields } = req.query;

  const paymentMethod = await updatePaymentMethodProviderSettings({
    context,
    paymentMethodId,
    paymentMethodProviderSettings
  });

  const response = ManagementPaymentMethodsUpdateProviderSettingsResponseFactory(
    {
      fields,
      paymentMethod
    }
  );

  res.status(STATUS_OK).json(response);
};
