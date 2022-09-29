import { GetOrderNoteFactory, getOrderNote } from './get-order-note';
import { PERMISSIONS } from '../../../constants';

describe('get-order-note', () => {
  let dependencies: any;
  let getOrderNote: getOrderNote;
  let input: any;

  beforeEach(() => {
    dependencies = {
      checkPermissions: jest.fn(),
      findOrderNote: jest.fn(() => ({})),
      throwNotFoundError: jest.fn(),
      OrderNoteFactory: jest.fn(() => ({}))
    };

    getOrderNote = GetOrderNoteFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      },
      orderNoteId: 'order-note-id'
    };
  });

  it('should export GetOrderNoteFactory function', () => {
    expect(typeof GetOrderNoteFactory).toBe('function');
  });

  it('GetOrderNoteFactory should return getOrderNote function', () => {
    expect(typeof getOrderNote).toBe('function');
  });

  describe('getOrderNote', () => {
    it('should check user permissions for reading orders notes', async () => {
      await getOrderNote(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.ordersNotesRead
      );
    });

    it('should call findOrderNote', async () => {
      await getOrderNote(input);

      const query = {
        storeId: input.context.storeId,
        id: input.orderNoteId
      };

      expect(dependencies.findOrderNote).toHaveBeenCalledWith(query);
    });

    it('should call throwNotFoundError if order note was not found', async () => {
      dependencies = {
        ...dependencies,
        findOrderNote: jest.fn()
      };

      getOrderNote = GetOrderNoteFactory(dependencies);

      const { orderNoteId } = input;

      await getOrderNote(input);

      expect(
        dependencies.throwNotFoundError
      ).toHaveBeenCalledWith('Order note not found', { orderNoteId });
    });

    it('should call OrderNoteFactory', async () => {
      await getOrderNote(input);
      expect(dependencies.OrderNoteFactory).toHaveBeenCalledWith({});
    });

    it('should return filtered fields', async () => {
      const returnedOrderNote = {
        id: 'order-note-id',
        content: 'content'
      };

      dependencies = {
        ...dependencies,
        OrderNoteFactory: jest.fn(() => returnedOrderNote)
      };

      getOrderNote = GetOrderNoteFactory(dependencies);

      input = { ...input, options: { fields: ['id'] } };

      let shippingMethod = await getOrderNote(input);
      expect(shippingMethod).toStrictEqual({ id: returnedOrderNote.id });

      input = { ...input, options: { fields: ['content'] } };

      shippingMethod = await getOrderNote(input);
      expect(shippingMethod).toStrictEqual({
        content: returnedOrderNote.content
      });

      input = { ...input, options: { fields: ['id', 'content'] } };

      shippingMethod = await getOrderNote(input);
      expect(shippingMethod).toStrictEqual(returnedOrderNote);
    });

    it('should return object if order note was found', async () => {
      const orderNote = await getOrderNote(input);
      expect(orderNote).toStrictEqual({});
    });
  });
});
