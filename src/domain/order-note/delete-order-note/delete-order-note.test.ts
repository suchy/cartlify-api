import { DeleteOrderNoteFactory, deleteOrderNote } from './delete-order-note';
import { PERMISSIONS } from '../../../constants';

describe('delete-order-note', () => {
  let dependencies: any;
  let deleteOrderNote: deleteOrderNote;
  let input: any;

  beforeEach(() => {
    dependencies = {
      checkPermissions: jest.fn(),
      removeOrderNote: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    deleteOrderNote = DeleteOrderNoteFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      },
      orderNoteId: 'order-note-id'
    };
  });

  it('should export DeleteOrderNoteFactory function', () => {
    expect(typeof DeleteOrderNoteFactory).toBe('function');
  });

  it('DeleteOrderNoteFactory should return deleteOrderNote function', () => {
    expect(typeof deleteOrderNote).toBe('function');
  });

  describe('deleteOrderNote', () => {
    it('should check user permissions for deleting orders notees', async () => {
      await deleteOrderNote(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.ordersNotesDelete
      );
    });

    it('should call removeOrderNote', async () => {
      await deleteOrderNote(input);

      const query = {
        storeId: input.context.storeId,
        id: input.orderNoteId
      };

      expect(dependencies.removeOrderNote).toHaveBeenLastCalledWith(query);
    });

    it('should return true if order note was deleted', async () => {
      const isDeleted = await deleteOrderNote(input);
      expect(isDeleted).toBe(true);
    });

    it('should call throwNotFoundError if order note was not deleted', async () => {
      dependencies = {
        ...dependencies,
        removeOrderNote: jest.fn(() => false)
      };

      deleteOrderNote = DeleteOrderNoteFactory(dependencies);

      await deleteOrderNote(input);

      expect(dependencies.throwNotFoundError).toHaveBeenCalledWith(
        'Order note not found',
        {
          orderNoteId: input.orderNoteId
        }
      );
    });
  });
});
