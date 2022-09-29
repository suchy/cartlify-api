import {
  ChangeOrderNoteContentFactory,
  changeOrderNoteContent
} from './change-order-note-content';
import { PERMISSIONS } from '../../../constants';

describe('change-order-note-content', () => {
  let dependencies: any;
  let changeOrderNoteContent: changeOrderNoteContent;
  let input: any;
  let orderNote: any;

  beforeEach(() => {
    orderNote = {
      changeContent: jest.fn(() => orderNote),
      serialize: jest.fn(() => ({}))
    };

    dependencies = {
      checkPermissions: jest.fn(),
      getOrderNote: jest.fn(() => orderNote),
      saveOrderNote: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    changeOrderNoteContent = ChangeOrderNoteContentFactory(dependencies);

    input = {
      context: { user: {}, storeId: 'store-id' },
      orderNoteId: 'order-note-id',
      content: 'order-note-content'
    };
  });

  it('should export ChangeOrderNoteContentFactory function', () => {
    expect(typeof ChangeOrderNoteContentFactory).toBe('function');
  });

  it('ChangeOrderNoteContentFactory should return changeOrderNoteContent function', () => {
    expect(typeof changeOrderNoteContent).toBe('function');
  });

  describe('changeOrderNoteContent', () => {
    it('should check user permissions for updating orders notes', async () => {
      await changeOrderNoteContent(input);
      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.ordersNotesWrite
      );
    });

    it('should call getOrderNote', async () => {
      await changeOrderNoteContent(input);
      expect(dependencies.getOrderNote).toHaveBeenCalledWith({
        context: input.context,
        orderNoteId: input.orderNoteId
      });
    });

    it('should call orderNote.changeContent', async () => {
      await changeOrderNoteContent(input);
      expect(orderNote.changeContent).toHaveBeenCalledWith(input.content);
    });

    it('should call saveOrderNote', async () => {
      await changeOrderNoteContent(input);

      const query = {
        storeId: input.context.storeId,
        id: input.orderNoteId
      };

      expect(dependencies.saveOrderNote).toHaveBeenCalledWith(query, {});
    });

    it('should return object if order note was saved', async () => {
      const updatedOrderNote = await changeOrderNoteContent(input);
      expect(updatedOrderNote).toStrictEqual(orderNote);
    });

    it('should call throwNotFoundError if order note was not found', async () => {
      dependencies = {
        ...dependencies,
        saveOrderNote: jest.fn()
      };

      changeOrderNoteContent = ChangeOrderNoteContentFactory(dependencies);

      await changeOrderNoteContent(input);

      expect(dependencies.throwNotFoundError).toHaveBeenCalledWith(
        'Order note not found',
        {
          orderNoteId: input.orderNoteId
        }
      );
    });
  });
});
