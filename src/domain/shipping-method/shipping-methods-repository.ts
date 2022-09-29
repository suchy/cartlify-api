import { createMongoRepository } from '../../infrastructure/mongo-repository';
import { Query, QueryOptions } from '../../helpers/query';

import {
  ShippingMethod,
  ShippingMethodFactory,
  ShippingMethodProps
} from './shipping-method/shipping-method';

interface ShippingMethodRecord {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  price: number;
  storeId: string;
  published: boolean;
}

export interface ShippingMethodsRepository {
  findOne: (
    query: Query<ShippingMethodRecord>
  ) => Promise<ShippingMethod | null>;

  find: (
    query: Query<ShippingMethodRecord>,
    options?: QueryOptions<ShippingMethodRecord>
  ) => Promise<ShippingMethod[]>;

  count: (query: Query<ShippingMethodRecord>) => Promise<number>;

  insert: (
    shippingMethodRecord: ShippingMethodRecord
  ) => Promise<ShippingMethod>;

  update: (
    query: Query<ShippingMethodRecord>,
    shippingMethodRecord: ShippingMethodRecord
  ) => Promise<ShippingMethod>;

  remove: (query: Query<ShippingMethodRecord>) => Promise<boolean>;
}

interface ShippingMethodsRepositoryFactoryDependencies {
  createMongoRepository: createMongoRepository<ShippingMethodProps>;
  ShippingMethodFactory: ShippingMethodFactory;
}

export const ShippingMethodsRepositoryFactory = ({
  createMongoRepository,
  ShippingMethodFactory
}: ShippingMethodsRepositoryFactoryDependencies) => {
  const repository = createMongoRepository('shipping-methods');

  const shippingMethodRepository: ShippingMethodsRepository = {
    async findOne(query) {
      const shippingMethodRecord = await repository.findOne(query);

      if (!shippingMethodRecord) {
        return null;
      }

      const shippingMethod = ShippingMethodFactory(shippingMethodRecord);

      return shippingMethod;
    },

    async find(query, options) {
      const shippingMethodRecords = await repository.find(query, options);
      const shippingMethods = shippingMethodRecords.map(ShippingMethodFactory);
      return shippingMethods;
    },

    async count(query) {
      return repository.count(query);
    },

    async insert(shippingMethodRecord) {
      await repository.insert(shippingMethodRecord);
      const shippingMethod = ShippingMethodFactory(shippingMethodRecord);
      return shippingMethod;
    },

    async update(query, shippingMethodRecord) {
      await repository.save(query, shippingMethodRecord);
      const shippingMethod = ShippingMethodFactory(shippingMethodRecord);
      return shippingMethod;
    },

    async remove(query) {
      return repository.delete(query);
    }
  };

  return shippingMethodRepository;
};
