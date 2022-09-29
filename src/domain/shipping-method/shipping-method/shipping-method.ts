import { validate } from '../../../helpers/validate';
import { shippingMethodValidationSchema } from './shipping-method-validation-schema';

export interface ShippingMethodProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  price: number;
  storeId: string;
  published: boolean;
}

export type ShippingMethod = Readonly<ShippingMethodProps>;

type ShippingMethodFactoryInjectable = (dependencies: {
  validate: validate;
}) => ShippingMethodFactory;

export type ShippingMethodFactory = (
  shippingMethodProps: ShippingMethodProps
) => ShippingMethod;

export const ShippingMethodFactoryInjectable: ShippingMethodFactoryInjectable = ({
  validate
}) => (shippingMethodProps) => {
  validate(
    shippingMethodValidationSchema,
    shippingMethodProps,
    'Shipping method is not valid.'
  );

  const shippingMethod: ShippingMethod = Object.freeze(shippingMethodProps);

  return shippingMethod;
};
