import { CreateOrderFactory, createOrder } from './create-order';
import { MOCKED_DATE, PERMISSIONS } from '../../../constants';

const RealDate = Date;

describe('create-order', () => {
  let dependencies: any;
  let createOrder: createOrder;
  let input: any;
  let paymentMethod: any;
  let product: any;
  let shippingMethod: any;
  let order: any;

  beforeAll(() => {
    // @ts-ignore
    global.Date = jest.fn(() => MOCKED_DATE);
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  beforeEach(() => {
    paymentMethod = {
      id: 'payment-method-id',
      provider: 'payu'
    };

    product = {
      id: 'product-id',
      name: 'name',
      description: 'description',
      price: 1,
      quantity: 1
    };

    shippingMethod = {
      id: 'shipping-method-id',
      name: 'name',
      price: 1
    };

    order = {
      serialize: jest.fn(() => ({}))
    };

    dependencies = {
      checkPermissions: jest.fn(),
      createId: jest.fn(() => 'order-id'),
      getPaymentMethod: jest.fn(() => paymentMethod),
      getProducts: jest.fn(() => [product]),
      getShippingMethod: jest.fn(() => shippingMethod),
      getStore: jest.fn(),
      insertOrder: jest.fn(),
      throwNotFoundError: jest.fn(),
      OrderFactory: jest.fn(() => order)
    };

    createOrder = CreateOrderFactory(dependencies);

    input = {
      client: {
        address: 'address',
        city: 'city',
        country: 'country',
        name: 'name',
        postal: 'postal',
        phone: 'phone',
        email: 'email@email.com'
      },
      context: { user: {}, storeId: 'store-id' },
      comment: 'comment',
      paymentMethodId: 'payment-method-id',
      shippingMethodId: 'shipping-method-id',
      orderedProducts: [{ id: 'product-id', quantity: 1 }]
    };
  });

  it('should export CreateOrderFactory function', () => {
    expect(typeof CreateOrderFactory).toBe('function');
  });

  it('CreateOrderFactory should return createOrder function', () => {
    expect(typeof createOrder).toBe('function');
  });

  describe('createOrder', () => {
    it('should check user permissions for creating order', async () => {
      await createOrder(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.ordersCreate
      );
    });

    it('should call getStore', async () => {
      await createOrder(input);
      expect(dependencies.getStore).toHaveBeenCalledWith({
        context: input.context
      });
    });

    it('should call getProducts', async () => {
      await createOrder(input);
      expect(dependencies.getProducts).toHaveBeenCalledWith({
        context: input.context,
        query: { id: { in: [product.id] } }
      });
    });

    it('should call throwNotFoundError if any ordered product is missing', async () => {
      dependencies = { ...dependencies, getProducts: jest.fn(() => []) };
      createOrder = CreateOrderFactory(dependencies);

      await createOrder(input);

      expect(
        dependencies.throwNotFoundError
      ).toHaveBeenCalledWith('Products not found', { products: [product.id] });
    });

    it('should call getPaymentMethod', async () => {
      await createOrder(input);

      expect(dependencies.getPaymentMethod).toHaveBeenCalledWith({
        context: input.context,
        paymentMethodId: input.paymentMethodId
      });
    });

    it('should call getShippingMethod', async () => {
      await createOrder(input);

      expect(dependencies.getShippingMethod).toHaveBeenCalledWith({
        context: input.context,
        shippingMethodId: input.shippingMethodId
      });
    });

    it('should call OrderFactory', async () => {
      await createOrder(input);

      const orderedProduct = {
        ...product,
        value: product.price * product.quantity
      };

      const orderData = {
        createdAt: MOCKED_DATE,
        client: input.client,
        comment: input.comment,
        id: 'order-id',
        paymentMethodVendor: paymentMethod.provider,
        products: [orderedProduct],
        productsValue: product.price,
        shippingMethod,
        status: 'NEW',
        storeId: input.context.storeId,
        totalValue: product.price + shippingMethod.price,
        updatedAt: MOCKED_DATE
      };

      expect(dependencies.OrderFactory).toHaveBeenCalledWith(orderData);
    });

    it('should call insertOrder', async () => {
      await createOrder(input);
      expect(dependencies.insertOrder).toHaveBeenCalledWith({});
    });

    it('should return an order', async () => {
      const createdOrder = await createOrder(input);
      expect(createdOrder).toStrictEqual(order);
    });
  });
});
