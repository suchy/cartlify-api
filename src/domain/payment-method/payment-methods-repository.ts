import { createMongoRepository } from '../../infrastructure/mongo-repository';
import { Query, QueryOptions } from '../../helpers/query';

import {
  PaymentMethod,
  PaymentMethodFactory,
  PaymentMethodProps,
  PaymentMethodProviders
} from './payment-method/payment-method';

export interface PaymentMethodRecord {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  provider: PaymentMethodProviders.payu;
  providerSettings: {
    clientId: string;
    clientSecret: string;
    posId: string;
    md5: string;
    continueUrl: string;
  };
  storeId: string;
  published: boolean;
}

export interface PaymentMethodsRepository {
  findOne: (query: Query<PaymentMethodRecord>) => Promise<PaymentMethod | null>;

  find: (
    query: Query<PaymentMethodRecord>,
    options?: QueryOptions<PaymentMethodRecord>
  ) => Promise<PaymentMethod[]>;

  count: (query: Query<PaymentMethodRecord>) => Promise<number>;

  insert: (paymentMethodRecord: PaymentMethodRecord) => Promise<PaymentMethod>;

  update: (
    query: Query<PaymentMethodRecord>,
    paymentMethodRecord: PaymentMethodRecord
  ) => Promise<PaymentMethod>;

  remove: (query: Query<PaymentMethodRecord>) => Promise<boolean>;
}

interface PaymentMethodsRepositoryFactoryDependencies {
  createMongoRepository: createMongoRepository<PaymentMethodProps>;
  PaymentMethodFactory: PaymentMethodFactory;
}

export const PaymentMethodsRepositoryFactory = ({
  createMongoRepository,
  PaymentMethodFactory
}: PaymentMethodsRepositoryFactoryDependencies) => {
  const repository = createMongoRepository('payment-methods');

  const paymentMethodRepository: PaymentMethodsRepository = {
    async findOne(query) {
      const paymentMethodRecord = await repository.findOne(query);

      if (!paymentMethodRecord) {
        return null;
      }

      const paymentMethod = PaymentMethodFactory(paymentMethodRecord);

      return paymentMethod;
    },

    async find(query, options) {
      const paymentMethodRecords = await repository.find(query, options);
      const paymentMethods = paymentMethodRecords.map(PaymentMethodFactory);
      return paymentMethods;
    },

    async count(query) {
      return repository.count(query);
    },

    async insert(paymentMethodRecord) {
      await repository.insert(paymentMethodRecord);
      const paymentMethod = PaymentMethodFactory(paymentMethodRecord);
      return paymentMethod;
    },

    async update(query, paymentMethodRecord) {
      await repository.save(query, paymentMethodRecord);
      const paymentMethod = PaymentMethodFactory(paymentMethodRecord);
      return paymentMethod;
    },

    async remove(query) {
      return repository.delete(query);
    }
  };

  return paymentMethodRepository;
};
