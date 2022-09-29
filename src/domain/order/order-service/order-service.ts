import {
  Order,
  OrderClient,
  OrderFactory,
  OrderShippingMethod,
  OrderStatus
} from '../order/order';

export type UpdatableOrderProps = Omit<
  Order,
  'id' | 'storeId' | 'createdAt' | 'updatedAt'
>;

export interface OrderService {
  changeClient: (client: OrderClient) => Order;
  changeShippingMethod: (shipingMethod: OrderShippingMethod) => Order;
  changeStatus: (status: keyof typeof OrderStatus) => Order;
}

export type OrderServiceFactory = (order: Order) => OrderService;

type OrderServiceFactoryFactory = (dependencies: {
  OrderFactory: OrderFactory;
}) => OrderServiceFactory;

export const OrderServiceFactoryFactory: OrderServiceFactoryFactory = ({
  OrderFactory
}) => (order) => {
  const update = (props: Partial<UpdatableOrderProps>) => {
    const orderData = { ...order, ...props, updatedAt: new Date() };
    return OrderFactory(orderData);
  };

  const orderService: OrderService = {
    changeClient(client) {
      return update({ client });
    },

    changeShippingMethod(shippingMethod) {
      const totalValue = order.productsValue + shippingMethod.price;
      return update({ shippingMethod, totalValue });
    },

    changeStatus(status) {
      return update({ status });
    }
  };

  return orderService;
};
