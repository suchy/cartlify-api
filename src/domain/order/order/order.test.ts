import { Order, OrderFactory, OrderFactoryInjectable } from './order';
import { MOCKED_DATE } from '../../constants';

const RealDate = Date;

describe('order', () => {
  let dependencies: any;
  let OrderFactory: OrderFactory;
  let input: any;
  let client: any;
  let products: any;
  let shippingMethod: any;
  let order: Order;

  beforeAll(() => {
    // @ts-ignore
    global.Date = jest.fn(() => MOCKED_DATE);
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  beforeEach(() => {
    dependencies = { validate: jest.fn() };

    OrderFactory = OrderFactoryInjectable(dependencies);

    client = {
      address: 'address',
      city: 'city',
      country: 'country',
      name: 'name',
      postal: 'postal',
      phone: 'phone',
      email: 'email@email.com'
    };

    products = [
      {
        id: 'product-id',
        name: 'name',
        description: 'description',
        price: 1,
        quantity: 1
      }
    ];

    shippingMethod = {
      id: 'shipping-method-id',
      name: 'name',
      price: 1
    };

    input = {
      client,
      comment: 'comment',
      createdAt: MOCKED_DATE,
      id: 'order-id',
      paymentMethodVendor: 'payu',
      products,
      productsValue: 1,
      shippingMethod,
      status: 'NEW',
      storeId: 'store-id',
      totalValue: 2,
      updatedAt: MOCKED_DATE
    };

    order = OrderFactory(input);
  });

  it('should export OrderFactoryInjectable function', () => {
    expect(typeof OrderFactoryInjectable).toBe('function');
  });

  it('OrderFactoryInjectable should return OrderFactory function', () => {
    expect(typeof OrderFactory).toBe('function');
  });

  xit('OrderFactory should throw validation error if input is not valid', () => {});

  it('OrderFactory should return order object', () => {
    const expectedResult = {
      ...input,
      changeClient: () => {},
      changeShippingMethod: () => {},
      changeStatus: () => {},
      serialize: () => {}
    };

    expect(JSON.stringify(order)).toBe(JSON.stringify(expectedResult));
  });

  describe('order', () => {
    it('should have only methods and read-only properties', () => {
      Object.keys(order).forEach((key) => {
        // @ts-ignore
        const isWritable = Object.getOwnPropertyDescriptor(order, key).writable;
        // @ts-ignore
        const isFunction = typeof order[key] === 'function';
        const isWritableOrFunction =
          (!isWritable && !isFunction) || (isWritable && isFunction);

        expect(isWritableOrFunction).toBeTruthy();
      });
    });

    it('changeClient method should return order with updated client', () => {
      const updatedClient = { ...client, name: 'updated name' };
      const updatedOrder = order.changeClient(updatedClient);
      expect(updatedOrder.client).toStrictEqual(updatedClient);
    });

    it('changeShippingMethod method should return order with updated shipping method', () => {
      const updatedShippingMethod = { ...shippingMethod, name: 'updated name' };
      const updatedOrderNote = order.changeShippingMethod(
        updatedShippingMethod
      );
      expect(updatedOrderNote.shippingMethod).toStrictEqual(
        updatedShippingMethod
      );
    });

    it('changeStatus method should return order with updated status', () => {
      const updatedOrderNote = order.changeStatus('IN_PROGRESS');
      expect(updatedOrderNote.status).toBe('IN_PROGRESS');
    });

    it('serialize method should return order data', () => {
      const orderData = order.serialize();
      expect(orderData).toStrictEqual(input);
    });
  });
});

// describe('it should throw validation error if', () => {
//   it('status is missing', async () => {
//     input = {
//       context: { user: {}, storeId: 'store-id' },
//       orderId: 'order-id'
//     };

//     const errors = await getFieldValidationErros(
//       changeOrderStatus(input),
//       'status'
//     );

//     expect(errors.length).toBe(1);
//   });

//   it('status is not a string', async () => {
//     input = {
//       context: { user: {}, storeId: 'store-id' },
//       orderId: 'order-id',
//       status: 1
//     };

//     const errors = await getFieldValidationErros(
//       changeOrderStatus(input),
//       'status'
//     );

//     expect(errors.length).toBe(2);
//   });

//   it('status is invalid', async () => {
//     input = {
//       context: { user: {}, storeId: 'store-id' },
//       orderId: 'order-id',
//       status: 'invalid-status'
//     };

//     const errors = await getFieldValidationErros(
//       changeOrderStatus(input),
//       'status'
//     );

//     expect(errors.length).toBe(1);
//   });
// });

// describe('it should throw validation error if', () => {
//   describe("if shipping method's", () => {
//     it('id is missing', async () => {
//       dependencies = {
//         ...dependencies,
//         getShippingMethod: jest.fn(() => ({ price: 1 }))
//       };
//       changeOrderShippingMethod = ChangeOrderShippingMethodFactory(
//         dependencies
//       );

//       const errors = await getFieldValidationErros(
//         changeOrderShippingMethod(input),
//         'shippingMethod.id'
//       );
//       expect(errors.length).toBe(1);
//     });

//     it('id is not a string', async () => {
//       dependencies = {
//         ...dependencies,
//         getShippingMethod: jest.fn(() => ({ id: 1, price: 1 }))
//       };
//       changeOrderShippingMethod = ChangeOrderShippingMethodFactory(
//         dependencies
//       );

//       const errors = await getFieldValidationErros(
//         changeOrderShippingMethod(input),
//         'shippingMethod.id'
//       );
//       expect(errors.length).toBe(1);
//     });

//     it('name is missing', async () => {
//       dependencies = {
//         ...dependencies,
//         getShippingMethod: jest.fn(() => ({ price: 1 }))
//       };
//       changeOrderShippingMethod = ChangeOrderShippingMethodFactory(
//         dependencies
//       );

//       const errors = await getFieldValidationErros(
//         changeOrderShippingMethod(input),
//         'shippingMethod.name'
//       );
//       expect(errors.length).toBe(1);
//     });

//     it('name is not a string', async () => {
//       dependencies = {
//         ...dependencies,
//         getShippingMethod: jest.fn(() => ({ name: 1, price: 1 }))
//       };
//       changeOrderShippingMethod = ChangeOrderShippingMethodFactory(
//         dependencies
//       );

//       const errors = await getFieldValidationErros(
//         changeOrderShippingMethod(input),
//         'shippingMethod.name'
//       );
//       expect(errors.length).toBe(1);
//     });

//     it('description is present and is not a string', async () => {
//       dependencies = {
//         ...dependencies,
//         getShippingMethod: jest.fn(() => ({ description: 1, price: 1 }))
//       };
//       changeOrderShippingMethod = ChangeOrderShippingMethodFactory(
//         dependencies
//       );

//       const errors = await getFieldValidationErros(
//         changeOrderShippingMethod(input),
//         'shippingMethod.description'
//       );
//       expect(errors.length).toBe(1);
//     });

//     it('price is missing', async () => {
//       dependencies = {
//         ...dependencies,
//         getShippingMethod: jest.fn(() => ({}))
//       };
//       changeOrderShippingMethod = ChangeOrderShippingMethodFactory(
//         dependencies
//       );

//       const errors = await getFieldValidationErros(
//         changeOrderShippingMethod(input),
//         'shippingMethod.price'
//       );
//       expect(errors.length).toBe(1);
//     });

//     it('price is not a number', async () => {
//       dependencies = {
//         ...dependencies,
//         getShippingMethod: jest.fn(() => ({ price: 'a' }))
//       };
//       changeOrderShippingMethod = ChangeOrderShippingMethodFactory(
//         dependencies
//       );

//       const errors = await getFieldValidationErros(
//         changeOrderShippingMethod(input),
//         'shippingMethod.price'
//       );
//       expect(errors.length).toBe(1);
//     });

//     it('price is lower than 0', async () => {
//       dependencies = {
//         ...dependencies,
//         getShippingMethod: jest.fn(() => ({ price: -1 }))
//       };
//       changeOrderShippingMethod = ChangeOrderShippingMethodFactory(
//         dependencies
//       );

//       const errors = await getFieldValidationErros(
//         changeOrderShippingMethod(input),
//         'shippingMethod.price'
//       );
//       expect(errors.length).toBe(1);
//     });
//   });

//   it('if totalValue is lower than 0', async () => {
//     dependencies = {
//       ...dependencies,
//       getShippingMethod: jest.fn(() => ({ price: -1 })),
//       findOrder: jest.fn(() => ({ productsValuee: -5 }))
//     };

//     changeOrderShippingMethod = ChangeOrderShippingMethodFactory(
//       dependencies
//     );

//     const errors = await getFieldValidationErros(
//       changeOrderShippingMethod(input),
//       'totalValue'
//     );
//     expect(errors.length).toBe(1);
//   });
// });

// describe("it should throw validation error if client's", () => {
//   it('address is missing', async () => {
//     const create = changeOrderClient({ ...input, client: {} });
//     const errors = await getFieldValidationErros(create, 'client.address');
//     expect(errors.length).toBe(1);
//   });

//   it('address is not a string', async () => {
//     const create = changeOrderClient({
//       ...input,
//       client: { address: 1 }
//     });
//     const errors = await getFieldValidationErros(create, 'client.address');
//     expect(errors.length).toBe(1);
//   });

//   it('city is missing', async () => {
//     const create = changeOrderClient({ ...input, client: {} });
//     const errors = await getFieldValidationErros(create, 'client.city');
//     expect(errors.length).toBe(1);
//   });

//   it('city is not a string', async () => {
//     const create = changeOrderClient({ ...input, client: { city: 1 } });
//     const errors = await getFieldValidationErros(create, 'client.city');
//     expect(errors.length).toBe(1);
//   });

//   it('country is missing', async () => {
//     const create = changeOrderClient({ ...input, client: {} });
//     const errors = await getFieldValidationErros(create, 'client.country');
//     expect(errors.length).toBe(1);
//   });

//   it('country is not a string', async () => {
//     const create = changeOrderClient({
//       ...input,
//       client: { country: 1 }
//     });
//     const errors = await getFieldValidationErros(create, 'client.country');
//     expect(errors.length).toBe(1);
//   });

//   it('name is missing', async () => {
//     const create = changeOrderClient({ ...input, client: {} });
//     const errors = await getFieldValidationErros(create, 'client.name');
//     expect(errors.length).toBe(1);
//   });

//   it('name is not a string', async () => {
//     const create = changeOrderClient({ ...input, client: { name: 1 } });
//     const errors = await getFieldValidationErros(create, 'client.name');
//     expect(errors.length).toBe(1);
//   });

//   it('postal is missing', async () => {
//     const create = changeOrderClient({ ...input, client: {} });
//     const errors = await getFieldValidationErros(create, 'client.postal');
//     expect(errors.length).toBe(1);
//   });

//   it('postal is not a string', async () => {
//     const create = changeOrderClient({ ...input, client: { postal: 1 } });
//     const errors = await getFieldValidationErros(create, 'client.postal');
//     expect(errors.length).toBe(1);
//   });

//   it('phone is missing', async () => {
//     const create = changeOrderClient({ ...input, client: {} });
//     const errors = await getFieldValidationErros(create, 'client.phone');
//     expect(errors.length).toBe(1);
//   });

//   it('phone is not a string', async () => {
//     const create = changeOrderClient({ ...input, client: { phone: 1 } });
//     const errors = await getFieldValidationErros(create, 'client.phone');
//     expect(errors.length).toBe(1);
//   });

//   it('email is missing', async () => {
//     const create = changeOrderClient({ ...input, client: {} });
//     const errors = await getFieldValidationErros(create, 'client.email');
//     expect(errors.length).toBe(1);
//   });

//   it('email is invalid', async () => {
//     const create = changeOrderClient({
//       ...input,
//       client: { email: 'invalid-email' }
//     });
//     const errors = await getFieldValidationErros(create, 'client.email');
//     expect(errors.length).toBe(1);
//   });
// });
