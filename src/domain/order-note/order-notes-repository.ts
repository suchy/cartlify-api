import { createMongoRepository } from '../../infrastructure/mongo-repository';
import { OrderNote, OrderNoteFactory } from './order-note/order-note';
import { Query, QueryOptions } from '../../helpers/query';

interface OrderNoteRecord {
  content: string;
  orderId: string;
  storeId: string;
  createdAt: Date;
  id: string;
  updatedAt: Date;
}

export interface OrderNotesRepository {
  findOne: (query: Query<OrderNoteRecord>) => Promise<OrderNote | null>;

  find: (
    query: Query<OrderNoteRecord>,
    options?: QueryOptions<OrderNoteRecord>
  ) => Promise<OrderNote[]>;

  count: (query: Query<OrderNoteRecord>) => Promise<number>;

  insert: (orderNoteRecord: OrderNoteRecord) => Promise<OrderNote>;

  update: (
    query: Query<OrderNoteRecord>,
    orderNoteRecord: OrderNoteRecord
  ) => Promise<OrderNote>;

  remove: (query: Query<OrderNoteRecord>) => Promise<boolean>;
}

export type OrderNotesRepositoryFactory = (dependencies: {
  createMongoRepository: createMongoRepository<OrderNoteRecord>;
  OrderNoteFactory: OrderNoteFactory;
}) => OrderNotesRepository;

export const OrderNotesRepositoryFactory: OrderNotesRepositoryFactory = ({
  createMongoRepository,
  OrderNoteFactory
}) => {
  const repository = createMongoRepository('products');

  const orderNoteRepository: OrderNotesRepository = {
    async findOne(query) {
      const orderNoteRecord = await repository.findOne(query);

      if (!orderNoteRecord) {
        return null;
      }

      const orderNote = OrderNoteFactory(orderNoteRecord);

      return orderNote;
    },

    async find(query, options) {
      const orderNotesRecords = await repository.find(query, options);
      const orderNotes = orderNotesRecords.map(OrderNoteFactory);
      return orderNotes;
    },

    async count(query) {
      return repository.count(query);
    },

    async insert(orderNoteRecord) {
      await repository.insert(orderNoteRecord);
      const orderNote = OrderNoteFactory(orderNoteRecord);
      return orderNote;
    },

    async update(query, orderNoteRecord) {
      await repository.save(query, orderNoteRecord);
      const orderNote = OrderNoteFactory(orderNoteRecord);
      return orderNote;
    },

    async remove(query) {
      return repository.delete(query);
    }
  };

  return orderNoteRepository;
};
