import { createMongoRepository } from '../../infrastructure/mongo-repository';
import { Query, QueryOptions } from '../../helpers/query';
import { Order, OrderFactory } from '../../domain/order/order/order';

interface OrderRecord {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  client: {
    address: string;
    city: string;
    country: string;
    name: string;
    postal: string;
    phone: string;
    email: string;
  };
  comment: string;
  paymentMethodVendor: 'payu';
  products: {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    value: number;
  }[];
  productsValue: number;
  shippingMethod: {
    id: string;
    name: string;
    description: string;
    price: number;
  };
  status: 'PAYMENT_PENDING' | 'NEW' | 'IN_PROGRESS' | 'SHIPPED';
  storeId: string;
  totalValue: number;
}

export interface OrdersRepository {
  findOne: (query: Query<OrderRecord>) => Promise<Order | null>;

  find: (
    query: Query<OrderRecord>,
    options?: QueryOptions<OrderRecord>
  ) => Promise<Order[]>;

  count: (query: Query<OrderRecord>) => Promise<number>;

  insert: (orderRecord: OrderRecord) => Promise<Order>;

  update: (
    query: Query<OrderRecord>,
    orderRecord: OrderRecord
  ) => Promise<Order>;

  remove: (query: Query<OrderRecord>) => Promise<boolean>;
}

export type OrdersRepositoryFactory = (dependencies: {
  createMongoRepository: createMongoRepository<OrderRecord>;
  OrderFactory: OrderFactory;
}) => OrdersRepository;

export const OrdersRepositoryFactory: OrdersRepositoryFactory = ({
  createMongoRepository,
  OrderFactory
}) => {
  const repository = createMongoRepository('products');

  const ordersRepository: OrdersRepository = {
    async findOne(query) {
      const orderRecord = await repository.findOne(query);

      if (!orderRecord) {
        return null;
      }

      const order = OrderFactory(orderRecord);

      return order;
    },

    async find(query, options) {
      const ordersRecords = await repository.find(query, options);
      const orders = ordersRecords.map(OrderFactory);
      return orders;
    },

    async count(query) {
      return repository.count(query);
    },

    async insert(orderRecord) {
      await repository.insert(orderRecord);
      const order = OrderFactory(orderRecord);
      return order;
    },

    async update(query, orderRecord) {
      await repository.save(query, orderRecord);
      const order = OrderFactory(orderRecord);
      return order;
    },

    async remove(query) {
      return repository.delete(query);
    }
  };

  return ordersRepository;
};
