import { Query } from '../../helpers/query';
import { Db } from 'mongodb';
import { buildQuery } from './query';

export interface QueryManyOptions {
  fields?: string[];
  sortBy?: string;
  sortDir?: 'asc' | 'dsc';
  page?: number;
  perPage?: number;
}

export type QueryOneOptions = Pick<QueryManyOptions, 'fields'>;

export interface MongoRepository<CollectionType> {
  find: (
    query: Query<CollectionType>,
    options?: QueryManyOptions
  ) => Promise<CollectionType[]>;

  findOne: (query: Query<CollectionType>) => Promise<CollectionType | null>;

  delete: (query: Query<CollectionType>) => Promise<boolean>;

  insert: (input: any) => Promise<boolean>;

  save: (query: Query<CollectionType>, input: any) => Promise<boolean>;

  count: (query: Query<CollectionType>) => Promise<number>;
}

export type createMongoRepository<CollectionType> = (
  collectionName: string
) => MongoRepository<CollectionType>;

interface CreateMongoRepositoryFactoryDependencies {
  database: Db;
}

export type CreateMongoRepositoryFactory = (
  dependencies: CreateMongoRepositoryFactoryDependencies
) => <CollectionType>(
  collectionName: string
) => MongoRepository<CollectionType>;

const defaultOptions = {
  sortBy: 'id',
  sortDir: 'dsc',
  page: 1,
  perPage: 50
};

export const CreateMongoRepositoryFactory: CreateMongoRepositoryFactory = ({
  database
}) => <CollectionType>(collectionName: string) => {
  const collection = database.collection<CollectionType>(collectionName);

  const repository: MongoRepository<CollectionType> = {
    find: async (query, options) => {
      const passedOptions = {
        sortBy: options?.sortBy || defaultOptions.sortBy,
        sortDir: options?.sortDir || defaultOptions.sortDir,
        page: options?.page || defaultOptions.page,
        perPage: options?.perPage || defaultOptions.perPage
      };

      const { sortBy, sortDir, page, perPage } = passedOptions;

      const pipeline: object[] = [{ $match: buildQuery(query) }];

      const sortDirections = { asc: 1, dsc: -1 };
      // @ts-ignore
      const sortDirection = sortDirections[sortDir] || sortDirections.dsc;

      pipeline.push({ $sort: { [sortBy]: sortDirection } });

      const limit = parseInt(perPage.toString(), 10);
      const skip = (parseInt(page.toString(), 10) - 1) * limit;

      pipeline.push({ $skip: skip });
      pipeline.push({ $limit: limit });

      pipeline.push({ $unset: '_id' });

      return await collection.aggregate(pipeline).toArray();
    },

    findOne: async (query) => {
      const results = await repository.find(query, {
        perPage: 1
      });

      return results.length ? results[0] : null;
    },

    delete: async (query) => {
      const deleted = await collection.findOneAndDelete(buildQuery(query));
      return Boolean(deleted.value);
    },

    insert: async (input) => {
      const createdInput = await collection.insertOne({ ...input });
      return Boolean(createdInput.insertedId);
    },

    save: async (query, input) => {
      const updatedInput = await collection.findOneAndUpdate(
        buildQuery(query),
        { $set: { ...input } },
        { returnOriginal: false }
      );

      return Boolean(updatedInput.value);
    },

    count: async (query) => {
      const count = await collection.countDocuments(buildQuery(query));
      return count;
    }
  };

  return repository;
};
