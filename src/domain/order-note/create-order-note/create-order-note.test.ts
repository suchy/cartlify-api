import { CreateOrderNoteFactory, createOrderNote } from './create-order-note';
import { MOCKED_DATE, PERMISSIONS } from '../../../constants';

const RealDate = Date;

describe('create-order-note', () => {
  let dependencies: any;
  let createOrderNote: createOrderNote;
  let input: any;
  let orderNote: any;

  beforeAll(() => {
    // @ts-ignore
    global.Date = jest.fn(() => MOCKED_DATE);
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  beforeEach(() => {
    orderNote = {
      serialize: jest.fn(() => ({}))
    };

    dependencies = {
      checkPermissions: jest.fn(),
      getOrder: jest.fn(() => ({})),
      insertOrderNote: jest.fn(),
      OrderNoteFactory: jest.fn(() => orderNote),
      createId: jest.fn(() => 'order-note-id'),
      getStore: jest.fn()
    };

    createOrderNote = CreateOrderNoteFactory(dependencies);

    input = {
      context: { user: {}, storeId: 'store-id' },
      orderId: 'order-id',
      content: 'order note content'
    };
  });

  it('should export CreateOrderNoteFactory function', () => {
    expect(typeof CreateOrderNoteFactory).toBe('function');
  });

  it('CreateOrderNoteFactory should return createOrderNote function', () => {
    expect(typeof createOrderNote).toBe('function');
  });

  describe('createOrderNote', () => {
    it('should check user permissions for creating order notes', async () => {
      await createOrderNote(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.ordersNotesCreate
      );
    });

    it('should call getStore', async () => {
      await createOrderNote(input);
      expect(dependencies.getStore).toHaveBeenCalledWith({
        context: input.context
      });
    });

    it('should call getOrder', async () => {
      await createOrderNote(input);
      expect(dependencies.getOrder).toHaveBeenCalledWith({
        context: input.context,
        orderId: input.orderId
      });
    });

    it('should call OrderNoteFactory', async () => {
      await createOrderNote(input);

      const orderNoteProps = {
        content: input.content,
        createdAt: MOCKED_DATE,
        id: 'order-note-id',
        orderId: input.orderId,
        storeId: input.context.storeId,
        updatedAt: MOCKED_DATE
      };

      expect(dependencies.OrderNoteFactory).toHaveBeenCalledWith(
        orderNoteProps
      );
    });

    it('should call insertOrderNote', async () => {
      await createOrderNote(input);
      expect(dependencies.insertOrderNote).toHaveBeenCalledWith({});
    });

    it('should return order note object', async () => {
      const createdOrderNote = await createOrderNote(input);
      expect(createdOrderNote).toStrictEqual(orderNote);
    });
  });
});
