import { Product } from '../../../../../domain/product/product/product';

export type ExpositionProductsGetStockManyResponseFactory = (params: {
  products: Product[];
  productsCount: number;
  productsPerPage: number;
}) => {
  products: { id: string; stock: number }[];
  pages: number;
  total: number;
};

export const ExpositionProductsGetStockManyResponseFactory: ExpositionProductsGetStockManyResponseFactory = ({
  products,
  productsCount,
  productsPerPage
}) => {
  const productsWithFilteredFields = products.map((product) => ({
    id: product.id,
    stock: product.stock
  }));

  const pagesCount = Math.ceil(productsCount / productsPerPage);

  return {
    products: productsWithFilteredFields,
    pages: pagesCount,
    total: productsCount
  };
};
