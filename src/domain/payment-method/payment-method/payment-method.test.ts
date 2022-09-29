import {
  PaymentMethodFactory,
  PaymentMethodFactoryInjectable
} from './payment-method';

describe('payment-method', () => {
  let dependencies: any;
  let PaymentMethodFactory: PaymentMethodFactory;

  beforeEach(() => {
    dependencies = { validate: jest.fn() };
    PaymentMethodFactory = PaymentMethodFactoryInjectable(dependencies);
  });

  it('should export PaymentMethodFactoryInjectable function', () => {
    expect(typeof PaymentMethodFactoryInjectable).toBe('function');
  });

  it('PaymentMethodFactoryInjectable should return PaymentMethodFactory function', () => {
    expect(typeof PaymentMethodFactory).toBe('function');
  });
});
