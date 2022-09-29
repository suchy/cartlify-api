import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { PERMISSIONS, ROlES } from '../../../constants';

interface AssignUserRoleFactoryDependencies {
  checkPermissions: checkPermissions;
}

interface AssignUserRoleParams {
  context: Context;
  roleName: ROlES;
}

export type assignUserRole = (params: AssignUserRoleParams) => Promise<boolean>;

type AssignUserRoleFactory = (
  dependencies: AssignUserRoleFactoryDependencies
) => assignUserRole;

export const AssignUserRoleFactory: AssignUserRoleFactory = ({
  checkPermissions
}) => async ({ context, roleName }) => {
  checkPermissions(context, PERMISSIONS.usersWrite);

  // const storeId = context.storeId as string;

  // const role = { [storeId]: roleName };

  return true;
};
