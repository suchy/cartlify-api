import {
  OrderNote,
  OrderNoteFactory,
  OrderNoteFactoryInjectable
} from './order-note';
import { MOCKED_DATE } from '../../../constants';

const RealDate = Date;

describe('order-note', () => {
  let dependencies: any;
  let OrderNoteFactory: OrderNoteFactory;
  let input: any;
  let orderNote: OrderNote;

  beforeAll(() => {
    // @ts-ignore
    global.Date = jest.fn(() => MOCKED_DATE);
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  beforeEach(() => {
    dependencies = { validate: jest.fn() };

    OrderNoteFactory = OrderNoteFactoryInjectable(dependencies);

    input = {
      content: 'Lorem ipsum',
      createdAt: MOCKED_DATE,
      id: 'order-note-id',
      orderId: 'order-id',
      storeId: 'store-id',
      updatedAt: MOCKED_DATE
    };

    orderNote = OrderNoteFactory(input);
  });

  it('should export OrderNoteFactoryInjectable function', () => {
    expect(typeof OrderNoteFactoryInjectable).toBe('function');
  });

  it('OrderNoteFactoryInjectable should return OrderNoteFactory function', () => {
    expect(typeof OrderNoteFactory).toBe('function');
  });

  xit('OrderNoteFactory should throw validation error if input is not valid', () => {});

  it('OrderNoteFactory should return order note object', () => {
    const expectedResult = {
      ...input,
      changeContent: () => {},
      serialize: () => {}
    };

    expect(JSON.stringify(orderNote)).toBe(JSON.stringify(expectedResult));
  });

  describe('orderNote', () => {
    it('should have only methods and read-only properties', () => {
      Object.keys(orderNote).forEach((key) => {
        // @ts-ignore
        const isWritable = Object.getOwnPropertyDescriptor(orderNote, key)
          .writable;
        // @ts-ignore
        const isFunction = typeof orderNote[key] === 'function';
        const isWritableOrFunction =
          (!isWritable && !isFunction) || (isWritable && isFunction);

        expect(isWritableOrFunction).toBeTruthy();
      });
    });

    it('changeContent method should return order note with updated content', () => {
      const updatedOrderNote = orderNote.changeContent('Not lorem ipsum');
      expect(updatedOrderNote.content).toBe('Not lorem ipsum');
    });

    it('serialize method should return order note data', () => {
      const orderNoteData = orderNote.serialize();
      expect(orderNoteData).toStrictEqual(input);
    });
  });
});

// describe('it should throw validation error if', () => {
//   it('id is missing', async () => {
//     dependencies = {
//       ...dependencies,
//       createId: jest.fn()
//     };
//     createOrderNote = CreateOrderNoteFactory(dependencies);

//     const create = createOrderNote(input);
//     const errors = await getFieldValidationErros(create, 'id');
//     expect(errors.length).toBe(1);
//   });

//   it('id is not a string', async () => {
//     dependencies = {
//       ...dependencies,
//       createId: jest.fn(() => 1)
//     };
//     createOrderNote = CreateOrderNoteFactory(dependencies);

//     const create = createOrderNote(input);
//     const errors = await getFieldValidationErros(create, 'id');
//     expect(errors.length).toBe(1);
//   });

//   it('storeId is missing', async () => {
//     const create = createOrderNote({
//       ...input,
//       context: { user: {} }
//     });
//     const errors = await getFieldValidationErros(create, 'storeId');
//     expect(errors.length).toBe(1);
//   });

//   it('storeId is not a string', async () => {
//     const create = createOrderNote({
//       ...input,
//       context: { user: {}, storeId: 1 }
//     });
//     const errors = await getFieldValidationErros(create, 'storeId');
//     expect(errors.length).toBe(1);
//   });

//   it('orderId is missing', async () => {
//     const create = createOrderNote({
//       ...input,
//       orderId: undefined
//     });
//     const errors = await getFieldValidationErros(create, 'orderId');
//     expect(errors.length).toBe(1);
//   });

//   it('orderId is not a string', async () => {
//     const create = createOrderNote({
//       ...input,
//       orderId: 1
//     });
//     const errors = await getFieldValidationErros(create, 'orderId');
//     expect(errors.length).toBe(1);
//   });

//   it('content is missing', async () => {
//     const create = createOrderNote({
//       ...input,
//       orderNoteContent: undefined
//     });
//     const errors = await getFieldValidationErros(create, 'content');
//     expect(errors.length).toBe(1);
//   });

//   it('content is not a string', async () => {
//     const create = createOrderNote({
//       ...input,
//       orderNoteContent: 1
//     });
//     const errors = await getFieldValidationErros(create, 'content');
//     expect(errors.length).toBe(1);
//   });
// });
