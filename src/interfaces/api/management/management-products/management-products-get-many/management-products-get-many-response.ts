import { Product } from '../../../../../domain/product/product/product';
import { FieldsOption } from '../../../../../helpers/query';
import { filterFields } from '../../../../../helpers/filter-fields';

export type ManagementProductsGetManyResponseFactory = (params: {
  fields?: FieldsOption<Product>[];
  products: Product[];
  productsCount: number;
  productsPerPage: number;
}) => {
  products: Partial<Product>[];
  pages: number;
  total: number;
};

export const ManagementProductsGetManyResponseFactory: ManagementProductsGetManyResponseFactory = ({
  fields,
  products,
  productsCount,
  productsPerPage
}) => {
  let productsWithFilteredFields: Partial<Product>[] = products;

  if (fields) {
    const fieldsFilter = filterFields<Product>(fields);
    productsWithFilteredFields = products.map(fieldsFilter);
  }

  const pagesCount = Math.ceil(productsCount / productsPerPage);

  return {
    products: productsWithFilteredFields,
    pages: pagesCount,
    total: productsCount
  };
};
