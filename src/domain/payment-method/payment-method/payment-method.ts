import { validate } from '../../../helpers/validate';
import { paymentMethodValidationSchema } from './payment-method-validation-schema';

export enum PaymentMethodProviders {
  payu = 'payu'
}

interface PayUSettings {
  clientId: string;
  clientSecret: string;
  posId: string;
  md5: string;
  continueUrl: string;
}

export type ProviderSettings = PayUSettings;

export interface PaymentMethodProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  provider: PaymentMethodProviders;
  providerSettings: ProviderSettings;
  storeId: string;
  published: boolean;
}

export type PaymentMethod = Readonly<PaymentMethodProps>;

type PaymentMethodFactoryInjectable = (dependencies: {
  validate: validate;
}) => PaymentMethodFactory;

export type PaymentMethodFactory = (
  paymentMethodProps: PaymentMethodProps
) => PaymentMethod;

export const PaymentMethodFactoryInjectable: PaymentMethodFactoryInjectable = ({
  validate
}) => (paymentMethodProps) => {
  validate(
    paymentMethodValidationSchema,
    paymentMethodProps,
    'Payment method is not valid.'
  );

  const paymentMethod: PaymentMethod = Object.freeze(paymentMethodProps);

  return paymentMethod;
};
