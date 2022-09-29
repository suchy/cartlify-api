import { Product } from '../../product/product/product';
import { OrderProduct } from '../../../domain/order/order/order';

interface ProductInOrder {
  id: string;
  quantity: number;
}

export const getMissingProductsIds = (
  products: Product[],
  orderedProductsIds: string[]
) => {
  if (products.length === orderedProductsIds.length) {
    return [];
  }

  const fetchedProductsIds = products.map(({ id }) => id);

  const notFetchedProductIds = orderedProductsIds.filter(
    (id) => !fetchedProductsIds.includes(id)
  );

  return notFetchedProductIds;
};

export const mapOrderProducts = (
  products: Product[],
  productsInOrder: ProductInOrder[]
) => {
  const orderProducts = products.map((product) => {
    const productInOrder = productsInOrder.find(({ id }) => id === product.id);
    const quantity = productInOrder?.quantity || 0;

    const orderProduct: OrderProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity,
      value: product.price * quantity
    };

    return orderProduct;
  });

  return orderProducts;
};
