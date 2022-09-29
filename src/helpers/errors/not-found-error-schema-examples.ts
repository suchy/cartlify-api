import { STATUS_NOT_FOUND } from '../../constants';

const exampleId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

const notFoundErrorBase = {
  name: 'NotFound',
  message: '',
  statusCodee: STATUS_NOT_FOUND,
  statusText: 'not-found',
  details: {}
};

export const orderNoteNotFoundErrorExample = {
  summary: 'Order note not found',
  description: 'Order note with given id was not found',
  value: {
    ...notFoundErrorBase,
    message: 'Order note not found',
    details: { orderNoteId: exampleId }
  }
};

export const orderNotFoundErrorExample = {
  summary: 'Order not found',
  description: 'Order with given id was not found',
  value: {
    ...notFoundErrorBase,
    message: 'Order not found',
    details: { orderId: exampleId }
  }
};

export const productNotFoundErrorExample = {
  summary: 'Product not found',
  description: 'Product with given id was not found',
  value: {
    ...notFoundErrorBase,
    message: 'Product not found',
    details: { productId: exampleId }
  }
};

export const paymentMethodNotFoundErrorExample = {
  summary: 'Payment method not found',
  description: 'Payment method with given id was not found',
  value: {
    ...notFoundErrorBase,
    message: 'Payment method not found',
    details: { paymentMethodId: exampleId }
  }
};

export const shippingMethodNotFoundErrorExample = {
  summary: 'Shipping method not found',
  description: 'Shipping method with given id was not found',
  value: {
    ...notFoundErrorBase,
    message: 'Shipping method not found',
    details: { shippingMethodId: exampleId }
  }
};

export const storeNotFoundErrorExample = {
  summary: 'Store not found',
  description: 'Store with given id was not found',
  value: {
    ...notFoundErrorBase,
    message: 'Store not found',
    details: { storeId: exampleId }
  }
};
