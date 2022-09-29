import {
  PaymentMethod,
  PaymentMethodFactory,
  ProviderSettings
} from '../payment-method/payment-method';

export type UpdatablePaymentMethodProps = Omit<
  PaymentMethod,
  'id' | 'storeId' | 'createdAt' | 'updatedAt' | 'provider'
>;

export interface PaymentMethodService {
  publish: () => PaymentMethod;
  unpublish: () => PaymentMethod;
  updateProviderSettings: (
    providerSeettings: ProviderSettings
  ) => PaymentMethod;
}

export type PaymentMethodServiceFactory = (
  paymentMethod: PaymentMethod
) => PaymentMethodService;

export type PaymentMethodServiceFactoryFactory = (dependencies: {
  PaymentMethodFactory: PaymentMethodFactory;
}) => PaymentMethodServiceFactory;

export const PaymentMethodServiceFactoryFactory: PaymentMethodServiceFactoryFactory = ({
  PaymentMethodFactory
}) => (paymentMethod) => {
  const update = (props: Partial<UpdatablePaymentMethodProps>) => {
    const newProps = { ...paymentMethod, ...props, updatedAt: new Date() };
    const newPaymentMethod = PaymentMethodFactory(newProps);
    return newPaymentMethod;
  };

  const paymentMethodService: PaymentMethodService = {
    publish() {
      return update({ published: true });
    },

    unpublish() {
      return update({ published: false });
    },

    updateProviderSettings(providerSettings) {
      return update({ providerSettings });
    }
  };

  return paymentMethodService;
};
