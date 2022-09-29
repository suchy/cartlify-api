import { AssignUserRoleFactory, assignUserRole } from './assign-user-role';
import { PERMISSIONS } from '../../../constants';

describe('assign-user-role', () => {
  let dependencies: any;
  let assignUserRole: assignUserRole;
  let input: any;

  beforeEach(() => {
    dependencies = {
      checkPermissions: jest.fn()
    };

    assignUserRole = AssignUserRoleFactory(dependencies);

    input = {
      context: { user: {} },
      roleName: 'owner'
    };
  });

  it('should export AssignUserRoleFactory function', () => {
    expect(typeof AssignUserRoleFactory).toBe('function');
  });

  it('AssignUserRoleFactory should return assignUserRole function', () => {
    expect(typeof assignUserRole).toBe('function');
  });

  describe('assignUserRole', () => {
    it('should check user permissions for creating store', async () => {
      await assignUserRole(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.usersWrite
      );
    });
  });
});
