import { Product } from '../../../../../domain/product/product/product';

export type ExpositionProductsGetStockResponseFactory = (params: {
  product: Product;
}) => Partial<{ id: string; sotck: number }>;

export const ExpositionProductsGetStockResponseFactory: ExpositionProductsGetStockResponseFactory = ({
  product
}) => {
  const productStock = {
    id: product.id,
    stock: product.stock
  };

  return productStock;
};
