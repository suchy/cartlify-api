import { createMongoRepository } from '../../infrastructure/mongo-repository';
import { Query, QueryOptions } from '../../helpers/query';
import { Store, StoreFactory } from './store/store';

interface StoreRecord {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  published: boolean;
}

export interface StoresRepository {
  findOne: (query: Query<StoreRecord>) => Promise<Store | null>;

  find: (
    query: Query<StoreRecord>,
    options?: QueryOptions<StoreRecord>
  ) => Promise<Store[]>;

  count: (query: Query<StoreRecord>) => Promise<number>;

  insert: (storeRecord: StoreRecord) => Promise<Store>;

  update: (
    query: Query<StoreRecord>,
    storeRecord: StoreRecord
  ) => Promise<Store>;

  remove: (query: Query<StoreRecord>) => Promise<boolean>;
}

export type StoresRepositoryFactory = (dependencies: {
  createMongoRepository: createMongoRepository<StoreRecord>;
  StoreFactory: StoreFactory;
}) => StoresRepository;

export const StoresRepositoryFactory: StoresRepositoryFactory = ({
  createMongoRepository,
  StoreFactory
}) => {
  const repository = createMongoRepository('stores');

  const storesRepository: StoresRepository = {
    async findOne(query) {
      const storeRecord = await repository.findOne(query);

      if (!storeRecord) {
        return null;
      }

      const store = StoreFactory(storeRecord);

      return store;
    },

    async find(query, options) {
      const storesRecords = await repository.find(query, options);
      const stores = storesRecords.map(StoreFactory);
      return stores;
    },

    async count(query) {
      return repository.count(query);
    },

    async insert(storeRecord) {
      await repository.insert(storeRecord);
      const store = StoreFactory(storeRecord);
      return store;
    },

    async update(query, storeRecord) {
      await repository.save(query, storeRecord);
      const store = StoreFactory(storeRecord);
      return store;
    },

    async remove(query) {
      return repository.delete(query);
    }
  };

  return storesRepository;
};
