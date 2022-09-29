import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { Order, OrderFactory } from '../../../domain/order/order/order';
import { OrdersRepository } from '../orders-repository';

import { ShippingMethodsRepository } from '../../shipping-method/shipping-methods-repository';

import { PaymentMethodsRepository } from '../../payment-method/payment-methods-repository';

import { ProductsRepository } from '../../product/products-repository';

import { createId } from '../../../helpers/create-id';
import { getMissingProductsIds, mapOrderProducts } from './helpers';
import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

interface CreateOrderFactoryDependencies {
  checkPermissions: checkPermissions;
  createId: createId;
  ordersRepository: OrdersRepository;
  OrderFactory: OrderFactory;
  paymentMethodsRepository: PaymentMethodsRepository;
  productsRepository: ProductsRepository;
  shippingMethodsRepository: ShippingMethodsRepository;
  throwNotFoundError: throwNotFoundError;
}

interface CreateOrderParams {
  context: Context;
  paymentMethodId: string;
  shippingMethodId: string;
  orderedProducts: { id: string; quantity: number }[];
  client: {
    address: string;
    city: string;
    country: string;
    name: string;
    postal: string;
    phone: string;
    email: string;
  };
  comment?: string;
}

export type createOrder = (params: CreateOrderParams) => Promise<Order>;

export type CreateOrderFactory = (
  dependencies: CreateOrderFactoryDependencies
) => createOrder;

export const CreateOrderFactory: CreateOrderFactory = ({
  checkPermissions,
  createId,
  ordersRepository,
  OrderFactory,
  paymentMethodsRepository,
  productsRepository,
  shippingMethodsRepository,
  throwNotFoundError
}) => async ({
  context,
  paymentMethodId,
  shippingMethodId,
  orderedProducts,
  client,
  comment = ''
}) => {
  checkPermissions(context, PERMISSIONS.ordersCreate);

  const storeId = context.storeId as string;

  const orderedProductsIds = orderedProducts.map(({ id }) => id);

  const products = await productsRepository.find({
    storeId,
    id: { in: orderedProductsIds }
  });

  const missingProductsIds = getMissingProductsIds(
    products,
    orderedProductsIds
  );

  if (missingProductsIds.length) {
    return throwNotFoundError('Products not found.', {
      products: missingProductsIds
    });
  }

  const paymentMethod = await paymentMethodsRepository.findOne({
    storeId,
    id: paymentMethodId
  });

  if (!paymentMethod) {
    return throwNotFoundError('Payment method not found.', {
      paymentMethodId: paymentMethodId
    });
  }

  const shippingMethod = await shippingMethodsRepository.findOne({
    storeId,
    id: shippingMethodId
  });

  if (!shippingMethod) {
    return throwNotFoundError('Shipping method not found.', {
      shippingMethodId: shippingMethodId
    });
  }

  const orderProducts = mapOrderProducts(products, orderedProducts);

  const orderProductsValue = orderProducts.reduce(
    (value, product) => value + product.value,
    0
  );

  const totalValue = orderProductsValue + shippingMethod.price;

  const timestamp = new Date();

  const order = OrderFactory({
    comment,
    client,
    createdAt: timestamp,
    id: createId(),
    paymentMethodVendor: paymentMethod.provider,
    products: orderProducts,
    productsValue: orderProductsValue,
    shippingMethod,
    status: 'NEW',
    storeId,
    totalValue,
    updatedAt: timestamp
  });

  await ordersRepository.insert(order);

  return order;
};
