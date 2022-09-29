import { validate } from '../../../helpers/validate';
import { productValidationSchema } from './product-validation-schema';

export interface ProductProps {
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

export type Product = Readonly<ProductProps>;

type ProductFactoryInjectable = (dependencies: {
  validate: validate;
}) => ProductFactory;

export type ProductFactory = (productProps: ProductProps) => Product;

export const ProductFactoryInjectable: ProductFactoryInjectable = ({
  validate
}) => (productProps) => {
  validate(productValidationSchema, productProps, 'Product is not valid.');

  const product: Product = Object.freeze(productProps);

  return product;
};
