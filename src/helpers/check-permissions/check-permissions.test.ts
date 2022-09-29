import { checkPermissions } from './check-permissions';
import {
  USER_PERMISSIONS,
  STORE_MEMBER_PERMISSIONS,
  STORE_OWNER_PERMISSIONS
} from '../../constants';

describe('checkPermissions', () => {
  let context: any;
  let userRolePermissions: string[];
  let memberRolePermissions: string[];
  let ownerRolePermissions: string[];

  beforeEach(() => {
    context = {
      storeId: 'fake-store-id',
      user: { userId: 'fake-user-id', roles: {} }
    };

    userRolePermissions = Object.values(USER_PERMISSIONS);
    memberRolePermissions = Object.values(STORE_MEMBER_PERMISSIONS);
    ownerRolePermissions = Object.values(STORE_OWNER_PERMISSIONS);
  });

  it('should take argument requiredPermissions as string or array of strings', () => {
    expect(checkPermissions(context, userRolePermissions[0])).toBeUndefined();
    expect(checkPermissions(context, userRolePermissions)).toBeUndefined();
  });

  it("should use user's role as default role if storeId is not passed", () => {
    context = {
      user: { userId: 'fake-user-id', roles: {} }
    };

    expect(checkPermissions(context, userRolePermissions)).toBeUndefined();
    expect(() => checkPermissions(context, memberRolePermissions)).toThrow();
    expect(() => checkPermissions(context, ownerRolePermissions)).toThrow();
  });

  describe("user's role", () => {
    beforeEach(() => {
      context = {
        ...context,
        user: { ...context.user, roles: { 'fake-store-id': 'user' } }
      };
    });

    it("should return undefined for for user's role permissions", () => {
      expect(checkPermissions(context, userRolePermissions)).toBeUndefined();
    });

    it("should throw an error for for members's role permissions", () => {
      expect(() => checkPermissions(context, memberRolePermissions)).toThrow();
    });

    it("should throw an error for for owner's role permissions", () => {
      expect(() => checkPermissions(context, ownerRolePermissions)).toThrow();
    });
  });

  describe("member's role", () => {
    beforeEach(() => {
      context = {
        ...context,
        user: { ...context.user, roles: { 'fake-store-id': 'member' } }
      };
    });

    it("should return undefined for for user's role permissions", () => {
      expect(checkPermissions(context, userRolePermissions)).toBeUndefined();
    });

    it("should return undefined for for members's role permissions", () => {
      expect(checkPermissions(context, memberRolePermissions)).toBeUndefined();
    });

    it("should throw an error for for owner's role permissions", () => {
      expect(() => checkPermissions(context, ownerRolePermissions)).toThrow();
    });
  });

  describe("owner's role", () => {
    beforeEach(() => {
      context = {
        ...context,
        user: { ...context.user, roles: { 'fake-store-id': 'owner' } }
      };
    });

    it("should return undefined for for user's role permissions", () => {
      expect(checkPermissions(context, userRolePermissions)).toBeUndefined();
    });

    it("should return undefined for for members's role permissions", () => {
      expect(checkPermissions(context, memberRolePermissions)).toBeUndefined();
    });

    it("should return undefined for for owner's role permissions", () => {
      expect(checkPermissions(context, ownerRolePermissions)).toBeUndefined();
    });
  });
});
