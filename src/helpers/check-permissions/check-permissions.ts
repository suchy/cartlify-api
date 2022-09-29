import {
  USER_PERMISSIONS,
  STORE_OWNER_PERMISSIONS,
  STORE_MEMBER_PERMISSIONS,
  ROlES
} from '../../constants';

export interface Context {
  user: {
    userId: string;
    roles?: {
      [storeId: string]: ROlES;
    };
  };
  storeId?: string;
}

export type checkPermissions = (
  context: Context,
  requiredPermissions: string | string[]
) => void | never;

export const checkPermissions: checkPermissions = (
  context,
  requiredPermissions
) => {
  const {
    user: { roles },
    storeId
  } = context;

  let userRole = ROlES.user;

  const hasUserRoles = roles && Object.values(roles).length > 0;

  if (storeId && hasUserRoles) {
    userRole = storeId && roles ? roles[storeId] : ROlES.user;
  }

  let permissionsGroup: string[];

  if (userRole === ROlES.user) {
    permissionsGroup = USER_PERMISSIONS;
  }

  if (userRole === ROlES.member) {
    permissionsGroup = STORE_MEMBER_PERMISSIONS;
  }

  if (userRole === ROlES.owner) {
    permissionsGroup = STORE_OWNER_PERMISSIONS;
  }

  const requestedPermissions = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [requiredPermissions];

  const isAnyPermissionDenied = requestedPermissions
    .map((permission) => permissionsGroup.includes(permission))
    .includes(false);

  if (isAnyPermissionDenied) {
    throw new Error('Permission denied.');
  }
};
