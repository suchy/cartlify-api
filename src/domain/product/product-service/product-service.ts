import { Product, ProductFactory } from '../product/product';

export type UpdatableProductProps = Omit<
  Product,
  'id' | 'storeId' | 'createdAt' | 'updatedAt'
>;

export interface ProductService {
  updateStock: (stock: number) => Product;
  decreaseStock: (quantity: number) => Product;
  increaseStock: (quantity: number) => Product;
  publish: () => Product;
  unpublish: () => Product;
  update: (props: Partial<UpdatableProductProps>) => Product;
}

export type ProductServiceFactory = (product: Product) => ProductService;

export type ProductServiceFactoryFactory = (dependencies: {
  ProductFactory: ProductFactory;
}) => ProductServiceFactory;

export const ProductServiceFactoryFactory: ProductServiceFactoryFactory = ({
  ProductFactory
}) => (product) => {
  const productService: ProductService = {
    updateStock(stock) {
      return productService.update({ stock });
    },

    decreaseStock(quantity) {
      const stock = product.stock - quantity;
      return productService.update({ stock });
    },

    increaseStock(quantity) {
      const stock = product.stock + quantity;
      return productService.update({ stock });
    },

    publish() {
      return productService.update({ published: true });
    },

    unpublish() {
      return productService.update({ published: false });
    },

    update(props) {
      const productData = { ...product, ...props, updatedAt: new Date() };
      return ProductFactory(productData);
    }
  };

  return productService;
};
