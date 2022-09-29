import { Product } from '../../../../../domain/product/product/product';
import { FieldsOption } from '../../../../../helpers/query';
import { filterFields } from '../../../../../helpers/filter-fields';

export type ExpositionProductsGetOneResponseFactory = (params: {
  fields?: FieldsOption<Product>[];
  product: Product;
}) => Partial<Product>;

export const ExpositionProductsGetOneResponseFactory: ExpositionProductsGetOneResponseFactory = ({
  fields,
  product
}) => {
  let productWithFilteredFields: Partial<Product> = product;

  if (fields) {
    productWithFilteredFields = filterFields<Product>(fields)(product);
  }

  return productWithFilteredFields;
};
