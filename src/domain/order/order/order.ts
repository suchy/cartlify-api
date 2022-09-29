import { validate } from '../../../helpers/validate';
import { orderValidationSchema } from './order-schema';

export interface OrderClient {
  address: string;
  city: string;
  country: string;
  name: string;
  postal: string;
  phone: string;
  email: string;
}

enum OrderPaymentMethodVendors {
  payu = 'payu'
}

export interface OrderProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  value: number;
}

export interface OrderShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
}

export enum OrderStatus {
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  SHIPPED = 'SHIPPED'
}

export interface OrderProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  client: OrderClient;
  comment: string;
  paymentMethodVendor: keyof typeof OrderPaymentMethodVendors;
  products: OrderProduct[];
  productsValue: number;
  shippingMethod: OrderShippingMethod;
  status: keyof typeof OrderStatus;
  storeId: string;
  totalValue: number;
}

export type Order = Readonly<OrderProps>;

type OrderFactoryFactory = (dependencies: {
  validate: validate;
}) => OrderFactory;

export type OrderFactory = (orderProps: OrderProps) => Order;

export const OrderFactoryFactory: OrderFactoryFactory = ({ validate }) => (
  orderProps
) => {
  validate(orderValidationSchema, orderProps, 'Order is not valid.');

  const order: Order = Object.freeze(orderProps);

  return order;
};
