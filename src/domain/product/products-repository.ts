import { createMongoRepository } from '../../infrastructure/mongo-repository';
import { Query, QueryOptions } from '../../helpers/query';
import { Product, ProductFactory } from './product/product';

interface ProductRecord {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  price: number;
  stock: number;
  storeId: string;
  published: boolean;
}

export interface ProductsRepository {
  findOne: (query: Query<ProductRecord>) => Promise<Product | null>;

  find: (
    query: Query<ProductRecord>,
    options?: QueryOptions<ProductRecord>
  ) => Promise<Product[]>;

  count: (query: Query<ProductRecord>) => Promise<number>;

  insert: (productRecord: ProductRecord) => Promise<Product>;

  update: (
    query: Query<ProductRecord>,
    productRecord: ProductRecord
  ) => Promise<Product>;

  remove: (query: Query<ProductRecord>) => Promise<boolean>;
}

export type ProductsRepositoryFactory = (dependencies: {
  createMongoRepository: createMongoRepository<ProductRecord>;
  ProductFactory: ProductFactory;
}) => ProductsRepository;

export const ProductsRepositoryFactory: ProductsRepositoryFactory = ({
  createMongoRepository,
  ProductFactory
}) => {
  const repository = createMongoRepository('products');

  const productsRepository: ProductsRepository = {
    async findOne(query) {
      const productRecord = await repository.findOne(query);

      if (!productRecord) {
        return null;
      }

      const product = ProductFactory(productRecord);

      return product;
    },

    async find(query, options) {
      const productsRecords = await repository.find(query, options);
      const products = productsRecords.map(ProductFactory);
      return products;
    },

    async count(query) {
      return repository.count(query);
    },

    async insert(productRecord) {
      await repository.insert(productRecord);
      const product = ProductFactory(productRecord);
      return product;
    },

    async update(query, productRecord) {
      await repository.save(query, productRecord);
      const product = ProductFactory(productRecord);
      return product;
    },

    async remove(query) {
      return repository.delete(query);
    }
  };

  return productsRepository;
};
