export const JSON_MIME_TYPE = 'application/json';

export const STATUS_OK = 200;

export const STATUS_CREATED = 201;

export const STATUS_NO_CONTENT = 204;

export const STATUS_BAD_REQUEST = 400;

export const STATUS_UNAUTHORIZED = 401;

export const STATUS_FORBIDDEN = 403;

export const STATUS_NOT_FOUND = 404;

export const STATUS_UNPROCESSABLE_ENTITY = 422;

export const STATUS_INTERNAL_ERROR = 500;

export enum ROlES {
  user = 'user',
  member = 'member',
  owner = 'owner'
}

export enum PERMISSIONS {
  ordersCreate = 'orders:create',
  ordersDelete = 'orders:delete',
  ordersRead = 'orders:read',
  ordersWrite = 'orders:write',
  ordersNotesCreate = 'ordersNotes:create',
  ordersNotesDelete = 'ordersNotes:delete',
  ordersNotesRead = 'ordersNotes:read',
  ordersNotesWrite = 'ordersNotes:write',
  paymentMethodsCreate = 'paymentMethods:create',
  paymentMethodsDelete = 'paymentMethods:delete',
  paymentMethodsRead = 'paymentMethods:read',
  paymentMethodsWrite = 'paymentMethods:write',
  productsCreate = 'products:create',
  productsDelete = 'products:delete',
  productsRead = 'products:read',
  productsWrite = 'products:write',
  shippingMethodsCreate = 'shippingMethods:create',
  shippingMethodsDelete = 'shippingMethods:delete',
  shippingMethodsRead = 'shippingMethods:read',
  shippingMethodsWrite = 'shippingMethods:write',
  storesCreate = 'stores:create',
  storesDelete = 'stores:delete',
  storesWrite = 'stores:write',
  storesRead = 'stores:read',
  usersStoresRead = 'users:storesRead',
  usersWrite = 'users:write'
}

export const USER_PERMISSIONS = [
  PERMISSIONS.storesCreate,
  PERMISSIONS.usersStoresRead,
  PERMISSIONS.usersWrite
];

export const STORE_MEMBER_PERMISSIONS = [
  ...USER_PERMISSIONS,
  PERMISSIONS.ordersNotesCreate,
  PERMISSIONS.ordersNotesDelete,
  PERMISSIONS.ordersNotesRead,
  PERMISSIONS.ordersNotesWrite,
  PERMISSIONS.productsCreate,
  PERMISSIONS.productsDelete,
  PERMISSIONS.productsRead,
  PERMISSIONS.productsWrite,
  PERMISSIONS.paymentMethodsCreate,
  PERMISSIONS.paymentMethodsDelete,
  PERMISSIONS.paymentMethodsRead,
  PERMISSIONS.paymentMethodsWrite,
  PERMISSIONS.shippingMethodsCreate,
  PERMISSIONS.shippingMethodsDelete,
  PERMISSIONS.shippingMethodsRead,
  PERMISSIONS.shippingMethodsWrite,
  PERMISSIONS.storesRead
];

export const STORE_OWNER_PERMISSIONS = [
  ...STORE_MEMBER_PERMISSIONS,
  PERMISSIONS.storesDelete
];

export const MOCKED_DATE = new Date('1988-06-29T13:00:00Z');
