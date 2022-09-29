import { asFunction, asValue, createContainer, AwilixContainer } from 'awilix';
import config from 'config';

// HELPERS
import { schema } from './interfaces/api/docs/schema';
import { checkPermissions } from './helpers/check-permissions/check-permissions';
import { createId } from './helpers/create-id';
import { ValidateFactory } from './helpers/validate';

import { ThrowNotFoundErrorFactory } from './helpers/errors/not-found-error';
import { ThrowForbiddenErrorFactory } from './helpers/errors/forbidden-error';
import { ThrowValidationFailedErrorFactory } from './helpers/errors/validation-failed-error';
import { ThrowUnauthorizedErrorFactory } from './helpers/errors/unauthorized-error';

// INFRASTRUCTURE
import { LoggerFactory } from './infrastructure/logger';
import { CreateMongoRepositoryFactory } from './infrastructure/mongo-repository';
import { MongoConnectionFactory } from './infrastructure/database-connection';

// ENTITIES
import { OrderFactoryFactory } from './domain/order/order/order';
import { OrderServiceFactoryFactory } from './domain/order/order-service/order-service';
import { OrderNoteFactoryInjectable } from './domain/order-note/order-note/order-note';
import { OrderNoteServiceFactoryFactory } from './domain/order-note/order-note-service/order-note-service';
import { PaymentMethodFactoryInjectable } from './domain/payment-method/payment-method/payment-method';
import { PaymentMethodServiceFactoryFactory } from './domain/payment-method/payment-methods-service/payment-methods-service';
import { ProductFactoryInjectable } from './domain/product/product/product';
import { ProductServiceFactoryFactory } from './domain/product/product-service/product-service';
import { ShippingMethodFactoryInjectable } from './domain/shipping-method/shipping-method/shipping-method';
import { ShippingMethodServiceFactoryFactory } from './domain/shipping-method/shipping-method-service/shipping-method-service';
import { StoreFactoryInjectable } from './domain/store/store/store';
import { StoreServiceFactoryFactory } from './domain/store/store-service/store-service';

// REPOSITORIES
import { OrdersRepositoryFactory } from './domain/order/orders-repository';
import { OrderNotesRepositoryFactory } from './domain/order-note/order-notes-repository';
import { PaymentMethodsRepositoryFactory } from './domain/payment-method/payment-methods-repository';
import { ProductsRepositoryFactory } from './domain/product/products-repository';
import { ShippingMethodsRepositoryFactory } from './domain/shipping-method/shipping-methods-repository';
import { StoresRepositoryFactory } from './domain/store/stores-repository';

// USE CASES
import { ChangeOrderClientFactory } from './domain/order/change-order-client/change-order-client';
import { ChangeOrderShippingMethodFactory } from './domain/order/change-order-shipping-method/change-order-shipping-method';
import { ChangeOrderStatusFactory } from './domain/order/change-order-status/change-order-status';
import { CreateOrderFactory } from './domain/order/create-order/create-order';
import { GetOrderFactory } from './domain/order/get-order/get-order';
import { GetOrdersWithCountFactory } from './domain/order/get-orders-with-count/get-orders-with-count';

import { ChangeOrderNoteContentFactory } from './domain/order-note/change-order-note-content/change-order-note-content';
import { CreateOrderNoteFactory } from './domain/order-note/create-order-note/create-order-note';
import { DeleteOrderNoteFactory } from './domain/order-note/delete-order-note/delete-order-note';
import { GetOrderNoteFactory } from './domain/order-note/get-order-note/get-order-note';
import { GetOrderNotesWithCountFactory } from './domain/order-note/get-order-notes-with-count/get-order-notes-with-count';

import { CreatePaymentMethodFactory } from './domain/payment-method/create-payment-method/create-payment-method';
import { DeletePaymentMethodFactory } from './domain/payment-method/delete-payment-method/delete-payment-method';
import { GetPaymentMethodFactory } from './domain/payment-method/get-payment-method/get-payment-method';
import { GetPublishedPaymentMethodFactory } from './domain/payment-method/get-published-payment-method/get-published-payment-method';
import { GetPaymentMethodsWithCountFactory } from './domain/payment-method/get-payment-methods-with-count/get-payment-methods-with-count';
import { GetPublishedPaymentMethodsWithCountFactory } from './domain/payment-method/get-published-payment-methods-with-count/get-published-payment-methods-with-count';
import { PublishPaymentMethodFactory } from './domain/payment-method/publish-payment-method/publish-payment-method';
import { UnpublishPaymentMethodFactory } from './domain/payment-method/unpublish-payment-method/unpublish-payment-method';
import { UpdatePaymentMethodProviderSettingsFactory } from './domain/payment-method/update-payment-method-provider-settings/update-payment-method-provider-settings';

import { ChangeProductFactory } from './domain/product/change-product/change-product';
import { CreateProductFactory } from './domain/product/create-product/create-product';
import { DeleteProductFactory } from './domain/product/delete-product/delete-product';
import { GetProductFactory } from './domain/product/get-product/get-product';
import { GetPublishedProductFactory } from './domain/product/get-published-product/get-published-product';
import { GetProductsWithCountFactory } from './domain/product/get-products-with-count/get-products-with-count';
import { GetPublishedProductsWithCountFactory } from './domain/product/get-published-products-with-count/get-published-products-with-count';
import { PublishProductFactory } from './domain/product/publish-product/publish-product';
import { UnpublishProductFactory } from './domain/product/unpublish-product/unpublish-product';

import { ChangeShippingMethodFactory } from './domain/shipping-method/change-shipping-method/change-shipping-method';
import { CreateShippingMethodFactory } from './domain/shipping-method/create-shipping-method/create-shipping-method';
import { DeleteShippingMethodFactory } from './domain/shipping-method/delete-shipping-method/delete-shipping-method';
import { GetShippingMethodFactory } from './domain/shipping-method/get-shipping-method/get-shipping-method';
import { GetPublishedShippingMethodFactory } from './domain/shipping-method/get-published-shipping-method/get-published-shipping-method';
import { GetShippingMethodsWithCountFactory } from './domain/shipping-method/get-shipping-methods-with-count/get-shipping-methods-with-count';
import { GetPublishedShippingMethodsWithCountFactory } from './domain/shipping-method/get-published-shipping-methods-with-count/get-published-shipping-methods-with-count';
import { PublishShippingMethodFactory } from './domain/shipping-method/publish-shipping-method/publish-shipping-method';
import { UnpublishShippingMethodFactory } from './domain/shipping-method/unpublish-shipping-method/unpublish-shipping-method';

import { ChangeStoreFactory } from './domain/store/change-store/change-store';
import { CreateStoreFactory } from './domain/store/create-store/create-store';
import { GetStoreFactory } from './domain/store/get-store/get-store';
import { PublishStoreFactory } from './domain/store/publish-store/publish-store';
import { UnpublishStoreFactory } from './domain/store/unpublish-store/unpublish-store';

// MIDDLEWARES
import { LogRequestFactory } from './interfaces/api/middlewares/log-request';
import { SetContextFactory } from './interfaces/api/middlewares/set-context';
import { ValidateAuthTokenFactory } from './interfaces/api/middlewares/validate-auth-token';

// ROUTERS, CONTROLLERS, RESPONSES
import { ApiFactory } from './interfaces/api/api';
import { ApiRouterFactory } from './interfaces/api/api-router';

import { DocsRouterFactory } from './interfaces/api/docs/docs-router';

import { ExpositionRouterFactory } from './interfaces/api/exposition/exposition-router';

// EXPOSITION API ORDERS
import { ExpositionOrdersRouterFactory } from './interfaces/api/exposition/exposition-orders/exposition-orders-router';

import { ExpositionOrdersCreateFactory } from './interfaces/api/exposition/exposition-orders/exposition-orders-create/exposition-orders-create';
import { ExpositionOrdersGetOneFactory } from './interfaces/api/exposition/exposition-orders/exposition-orders-get-one/exposition-orders-get-one';

// EXPOSITION API PAYMENT METHODS
import { ExpositionPaymentMethodsRouterFactory } from './interfaces/api/exposition/exposition-payment-methods/exposition-payment-methods-router';

import { ExpositionPaymentMethodsGetOneFactory } from './interfaces/api/exposition/exposition-payment-methods/exposition-payment-methods-get-one/exposition-payment-methods-get-one';
import { ExpositionPaymentMethodsGetManyFactory } from './interfaces/api/exposition/exposition-payment-methods/exposition-payment-methods-get-many/exposition-payment-methods-get-many';

// EXPOSITION API PRODUCTS
import { ExpositionProductsRouterFactory } from './interfaces/api/exposition/exposition-products/exposition-products-router';

import { ExpositionProductsGetOneFactory } from './interfaces/api/exposition/exposition-products/exposition-products-get-one/exposition-products-get-one';
import { ExpositionProductsGetManyFactory } from './interfaces/api/exposition/exposition-products/exposition-products-get-many/exposition-products-get-many';
import { ExpositionProductsGetStockFactory } from './interfaces/api/exposition/exposition-products/exposition-products-get-stock/exposition-products-get-stock';
import { ExpositionProductsGetStockManyFactory } from './interfaces/api/exposition/exposition-products/exposition-products-get-stock-many/exposition-products-get-stock-many';

// EXPOSITION API SHIPPING METHODS
import { ExpositionShippingMethodsRouterFactory } from './interfaces/api/exposition/exposition-shipping-methods/exposition-shipping-methods-router';

import { ExpositionShippingMethodsGetOneFactory } from './interfaces/api/exposition/exposition-shipping-methods/exposition-shipping-methods-get-one/exposition-shipping-methods-get-one';
import { ExpositionShippingMethodsGetManyFactory } from './interfaces/api/exposition/exposition-shipping-methods/exposition-shipping-methods-get-many/exposition-shipping-methods-get-many';

// MANAGEMENT API
import { ManagementRouterFactory } from './interfaces/api/management/management-router';

// MANAGEMENT API ORDER NOTES
import { ManagementOrdersNotesRouterFactory } from './interfaces/api/management/management-orders-notes/management-orders-notes-router';
import { ManagementOrdersNotesChangeContentFactory } from './interfaces/api/management/management-orders-notes/management-orders-notes-change-content/management-orders-notes-change-content';
import { ManagementOrdersNotesCreateFactory } from './interfaces/api/management/management-orders-notes/management-orders-notes-create/management-orders-notes-create';
import { ManagementOrdersNotesDeleteFactory } from './interfaces/api/management/management-orders-notes/management-orders-notes-delete/management-orders-notes-delete';
import { ManagementOrdersNotesGetManyFactory } from './interfaces/api/management/management-orders-notes/management-orders-notes-get-many/management-orders-notes-get-many';
import { ManagementOrdersNotesGetOneFactory } from './interfaces/api/management/management-orders-notes/management-orders-notes-get-one/management-orders-notes-get-one';

// MANAGEMENT API ORDES
import { ManagementOrdersRouterFactory } from './interfaces/api/management/management-orders/management-orders-router';
import { ManagementOrdersChangeShippingMethodFactory } from './interfaces/api/management/management-orders/management-orders-change-shipping-method/management-orders-change-shipping-method';
import { ManagementOrdersChangeStatusFactory } from './interfaces/api/management/management-orders/management-orders-change-status/management-orders-change-status';
import { ManagementOrdersGetManyFactory } from './interfaces/api/management/management-orders/management-orders-get-many/management-orders-get-many';
import { ManagementOrdersGetOneFactory } from './interfaces/api/management/management-orders/management-orders-get-one/management-orders-get-one';

// MANAGEMENT API PAYMENT METHODS
import { ManagementPaymentMethodsRouterFactory } from './interfaces/api/management/management-payment-methods/management-payment-methods-router';
import { ManagementPaymentMethodsCreateFactory } from './interfaces/api/management/management-payment-methods/management-payment-methods-create/management-payment-methods-create';
import { ManagementPaymentMethodsDeleteFactory } from './interfaces/api/management/management-payment-methods/management-payment-methods-delete/management-payment-methods-delete';
import { ManagementPaymentMethodsGetManyFactory } from './interfaces/api/management/management-payment-methods/management-payment-methods-get-many/management-payment-methods-get-many';
import { ManagementPaymentMethodsGetOneFactory } from './interfaces/api/management/management-payment-methods/management-payment-methods-get-one/management-payment-methods-get-one';
import { ManagementPaymentMethodsPublishFactory } from './interfaces/api/management/management-payment-methods/management-payment-methods-publish/management-payment-methods-publish';
import { ManagementPaymentMethodsUnpublishFactory } from './interfaces/api/management/management-payment-methods/management-payment-methods-unpublish/management-payment-methods-unpublish';
import { ManagementPaymentMethodsUpdateProviderSettingsFactory } from './interfaces/api/management/management-payment-methods/management-payment-methods-update-provider-settings/management-payment-methods-update-provider-settings';

// MANAGEMENT API PRODUCTS
import { ManagementProductsRouterFactory } from './interfaces/api/management/management-products/management-products-router';
import { ManagementProductsCreateFactory } from './interfaces/api/management/management-products/management-products-create/management-products-create';
import { ManagementProductsDeleteFactory } from './interfaces/api/management/management-products/management-products-delete/management-products-delete';
import { ManagementProductsGetManyFactory } from './interfaces/api/management/management-products/management-products-get-many/management-products-get-many';
import { ManagementProductsGetOneFactory } from './interfaces/api/management/management-products/management-products-get-one/management-products-get-one';
import { ManagementProductsPublishFactory } from './interfaces/api/management/management-products/management-products-publish/management-products-publish';
import { ManagementProductsUnpublishFactory } from './interfaces/api/management/management-products/management-products-unpublish/management-products-unpublish';
import { ManagementProductsUpdateFactory } from './interfaces/api/management/management-products/management-products-update/management-products-update';

// MANAGEMENT API SHIPPING METHODS
import { ManagementShippingMethodsRouterFactory } from './interfaces/api/management/management-shipping-methods/management-shipping-methods-router';
import { ManagementShippingMethodsCreateFactory } from './interfaces/api/management/management-shipping-methods/management-shipping-methods-create/management-shipping-methods-create';
import { ManagementShippingMethodsDeleteFactory } from './interfaces/api/management/management-shipping-methods/management-shipping-methods-delete/management-shipping-methods-delete';
import { ManagementShippingMethodsGetManyFactory } from './interfaces/api/management/management-shipping-methods/management-shipping-methods-get-many/management-shipping-methods-get-many';
import { ManagementShippingMethodsGetOneFactory } from './interfaces/api/management/management-shipping-methods/management-shipping-methods-get-one/management-shipping-methods-get-one';
import { ManagementShippingMethodsPublishFactory } from './interfaces/api/management/management-shipping-methods/management-shipping-methods-publish/management-shipping-methods-publish';
import { ManagementShippingMethodsUnpublishFactory } from './interfaces/api/management/management-shipping-methods/management-shipping-methods-unpublish/management-shipping-methods-unpublish';
import { ManagementShippingMethodsUpdateFactory } from './interfaces/api/management/management-shipping-methods/management-shipping-methods-update/management-shipping-methods-update';

// MANAGEMENT API STORES
import { ManagementStoresRouterFactory } from './interfaces/api/management/management-stores/management-stores-router';
import { ManagementStoresCreateFactory } from './interfaces/api/management/management-stores/management-stores-create/management-stores-create';
import { ManagementStoresGetOneFactory } from './interfaces/api/management/management-stores/management-stores-get-one/management-stores-get-one';
import { ManagementStoresPublishFactory } from './interfaces/api/management/management-stores/management-stores-publish/management-stores-publish';
import { ManagementStoresUnpublishFactory } from './interfaces/api/management/management-stores/management-stores-unpublish/management-stores-unpublish';
import { ManagementStoresUpdateFactory } from './interfaces/api/management/management-stores/management-stores-update/management-stores-update';

let container: AwilixContainer | undefined;

export const ContainerFactory = async () => {
  if (container) return container;

  const dbname = config.get<string>('mongo.database');
  const url = config.get<string>('mongo.url');
  const logLevel = config.get<string>('logLevel');

  const logger = LoggerFactory(logLevel);

  const {
    connection: dbConnection,
    db: database
  } = await MongoConnectionFactory({
    logger,
    url,
    dbname
  });

  const dependencies = {
    // HELPERS
    apiSchema: asValue(schema),
    checkPermissions: asValue(checkPermissions),
    createId: asValue(createId),
    validate: asFunction(ValidateFactory),

    throwNotFoundError: asFunction(ThrowNotFoundErrorFactory),
    throwForbiddenError: asFunction(ThrowForbiddenErrorFactory),
    throwValidationFailedError: asFunction(ThrowValidationFailedErrorFactory),
    throwUnauthorizedError: asFunction(ThrowUnauthorizedErrorFactory),

    // INFRASTRUCTURE
    database: asValue(database),
    dbConnection: asValue(dbConnection),
    logger: asValue(logger),
    createMongoRepository: asFunction(CreateMongoRepositoryFactory),

    // REPOSITORIES
    ordersRepository: asFunction(OrdersRepositoryFactory),
    orderNotesRepository: asFunction(OrderNotesRepositoryFactory),
    paymentMethodsRepository: asFunction(PaymentMethodsRepositoryFactory),
    productsRepository: asFunction(ProductsRepositoryFactory),
    shippingMethodsRepository: asFunction(ShippingMethodsRepositoryFactory),
    storesRepository: asFunction(StoresRepositoryFactory),

    // ENTITIES
    OrderFactory: asFunction(OrderFactoryFactory),
    OrderServiceFactory: asFunction(OrderServiceFactoryFactory),
    OrderNoteFactory: asFunction(OrderNoteFactoryInjectable),
    OrderNoteServiceFactory: asFunction(OrderNoteServiceFactoryFactory),
    PaymentMethodFactory: asFunction(PaymentMethodFactoryInjectable),
    PaymentMethodServiceFactory: asFunction(PaymentMethodServiceFactoryFactory),
    ProductFactory: asFunction(ProductFactoryInjectable),
    ProductServiceFactory: asFunction(ProductServiceFactoryFactory),
    ShippingMethodFactory: asFunction(ShippingMethodFactoryInjectable),
    ShippingMethodServiceFactory: asFunction(
      ShippingMethodServiceFactoryFactory
    ),
    StoreFactory: asFunction(StoreFactoryInjectable),
    StoreServiceFactory: asFunction(StoreServiceFactoryFactory),

    // USE CASES
    changeOrderClient: asFunction(ChangeOrderClientFactory),
    changeOrderShippingMethod: asFunction(ChangeOrderShippingMethodFactory),
    changeOrderStatus: asFunction(ChangeOrderStatusFactory),
    createOrder: asFunction(CreateOrderFactory),
    getOrder: asFunction(GetOrderFactory),
    getOrdersWithCount: asFunction(GetOrdersWithCountFactory),

    changeOrderNoteContent: asFunction(ChangeOrderNoteContentFactory),
    createOrderNote: asFunction(CreateOrderNoteFactory),
    deleteOrderNote: asFunction(DeleteOrderNoteFactory),
    getOrderNote: asFunction(GetOrderNoteFactory),
    getOrderNotesWithCount: asFunction(GetOrderNotesWithCountFactory),

    createPaymentMethod: asFunction(CreatePaymentMethodFactory),
    deletePaymentMethod: asFunction(DeletePaymentMethodFactory),
    getPaymentMethod: asFunction(GetPaymentMethodFactory),
    getPublishedPaymentMethod: asFunction(GetPublishedPaymentMethodFactory),
    getPaymentMethodsWithCount: asFunction(GetPaymentMethodsWithCountFactory),
    getPublishedPaymentMethodsWithCount: asFunction(
      GetPublishedPaymentMethodsWithCountFactory
    ),
    publishPaymentMethod: asFunction(PublishPaymentMethodFactory),
    unpublishPaymentMethod: asFunction(UnpublishPaymentMethodFactory),
    updatePaymentMethodProviderSettings: asFunction(
      UpdatePaymentMethodProviderSettingsFactory
    ),

    changeProduct: asFunction(ChangeProductFactory),
    createProduct: asFunction(CreateProductFactory),
    deleteProduct: asFunction(DeleteProductFactory),
    getProduct: asFunction(GetProductFactory),
    getPublishedProduct: asFunction(GetPublishedProductFactory),
    getProductsWithCount: asFunction(GetProductsWithCountFactory),
    getPublishedProductsWithCount: asFunction(
      GetPublishedProductsWithCountFactory
    ),
    publishProduct: asFunction(PublishProductFactory),
    unpublishProduct: asFunction(UnpublishProductFactory),

    changeShippingMethod: asFunction(ChangeShippingMethodFactory),
    createShippingMethod: asFunction(CreateShippingMethodFactory),
    deleteShippingMethod: asFunction(DeleteShippingMethodFactory),
    getShippingMethod: asFunction(GetShippingMethodFactory),
    getPublishedShippingMethod: asFunction(GetPublishedShippingMethodFactory),
    getShippingMethodsWithCount: asFunction(GetShippingMethodsWithCountFactory),
    getPublishedShippingMethodsWithCount: asFunction(
      GetPublishedShippingMethodsWithCountFactory
    ),
    publishShippingMethod: asFunction(PublishShippingMethodFactory),
    unpublishShippingMethod: asFunction(UnpublishShippingMethodFactory),

    changeStore: asFunction(ChangeStoreFactory),
    createStore: asFunction(CreateStoreFactory),
    getStore: asFunction(GetStoreFactory),
    publishStore: asFunction(PublishStoreFactory),
    unpublishStore: asFunction(UnpublishStoreFactory),

    // MIDDLEWARES
    logRequest: asFunction(LogRequestFactory),
    setContext: asFunction(SetContextFactory),
    validateAuthToken: asFunction(ValidateAuthTokenFactory),

    // API ROUTERS, CONTROLLERS AND RESPONSES
    api: asFunction(ApiFactory),
    apiRouter: asFunction(ApiRouterFactory),
    docsRouter: asFunction(DocsRouterFactory),

    // EXPOSITION API
    expositionRouter: asFunction(ExpositionRouterFactory),

    // EXPOSITION API ORDERS
    expositionOrdersRouter: asFunction(ExpositionOrdersRouterFactory),
    expositionOrdersCreate: asFunction(ExpositionOrdersCreateFactory),
    expositionOrdersGetOne: asFunction(ExpositionOrdersGetOneFactory),

    // EXPOSITION API PAYMENT METHODS
    expositionPaymentMethodsRouter: asFunction(
      ExpositionPaymentMethodsRouterFactory
    ),
    expositionPaymentMethodsGetMany: asFunction(
      ExpositionPaymentMethodsGetManyFactory
    ),
    expositionPaymentMethodsGetOne: asFunction(
      ExpositionPaymentMethodsGetOneFactory
    ),

    // EXPOSITION API PRODUCTS

    expositionProductsRouter: asFunction(ExpositionProductsRouterFactory),
    expositionProductsGetMany: asFunction(ExpositionProductsGetManyFactory),
    expositionProductsGetOne: asFunction(ExpositionProductsGetOneFactory),
    expositionProductsGetStock: asFunction(ExpositionProductsGetStockFactory),
    expositionProductsGetStockMany: asFunction(
      ExpositionProductsGetStockManyFactory
    ),

    // EXPOSITION API SHIPPING METHODS

    expositionShippingMethodsRouter: asFunction(
      ExpositionShippingMethodsRouterFactory
    ),
    expositionShippingMethodsGetMany: asFunction(
      ExpositionShippingMethodsGetManyFactory
    ),
    expositionShippingMethodsGetOne: asFunction(
      ExpositionShippingMethodsGetOneFactory
    ),

    // MANAGEMENT API
    managementRouter: asFunction(ManagementRouterFactory),

    // MANAGEMENT API ORDER NOTES
    managementOrdersNotesRouter: asFunction(ManagementOrdersNotesRouterFactory),
    managementOrdersNotesChangeContent: asFunction(
      ManagementOrdersNotesChangeContentFactory
    ),
    managementOrdersNotesCreate: asFunction(ManagementOrdersNotesCreateFactory),
    managementOrdersNotesDelete: asFunction(ManagementOrdersNotesDeleteFactory),
    managementOrdersNotesGetMany: asFunction(
      ManagementOrdersNotesGetManyFactory
    ),
    managementOrdersNotesGetOne: asFunction(ManagementOrdersNotesGetOneFactory),

    // MANAGEMENT API ORDERS
    managementOrdersRouter: asFunction(ManagementOrdersRouterFactory),
    managementOrdersChangeShippingMethod: asFunction(
      ManagementOrdersChangeShippingMethodFactory
    ),
    managementOrdersChangeStatus: asFunction(
      ManagementOrdersChangeStatusFactory
    ),
    managementOrdersGetMany: asFunction(ManagementOrdersGetManyFactory),
    managementOrdersGetOne: asFunction(ManagementOrdersGetOneFactory),

    // MANAGEMENT API PAYMENT METHODS
    managementPaymentMethodsRouter: asFunction(
      ManagementPaymentMethodsRouterFactory
    ),
    managementPaymentMethodsCreate: asFunction(
      ManagementPaymentMethodsCreateFactory
    ),
    managementPaymentMethodsDelete: asFunction(
      ManagementPaymentMethodsDeleteFactory
    ),
    managementPaymentMethodsGetMany: asFunction(
      ManagementPaymentMethodsGetManyFactory
    ),
    managementPaymentMethodsGetOne: asFunction(
      ManagementPaymentMethodsGetOneFactory
    ),
    managementPaymentMethodsPublish: asFunction(
      ManagementPaymentMethodsPublishFactory
    ),
    managementPaymentMethodsUnpublish: asFunction(
      ManagementPaymentMethodsUnpublishFactory
    ),
    managementPaymentMethodsUpdateProviderSettings: asFunction(
      ManagementPaymentMethodsUpdateProviderSettingsFactory
    ),

    // MANAGEMENT API PRODUCTS
    managementProductsRouter: asFunction(ManagementProductsRouterFactory),
    managementProductsCreate: asFunction(ManagementProductsCreateFactory),
    managementProductsDelete: asFunction(ManagementProductsDeleteFactory),
    managementProductsGetMany: asFunction(ManagementProductsGetManyFactory),
    managementProductsGetOne: asFunction(ManagementProductsGetOneFactory),
    managementProductsPublish: asFunction(ManagementProductsPublishFactory),
    managementProductsUnpublish: asFunction(ManagementProductsUnpublishFactory),
    managementProductsUpdate: asFunction(ManagementProductsUpdateFactory),

    // MANAGEMENT API SHIPPING METHODS
    managementShippingMethodsRouter: asFunction(
      ManagementShippingMethodsRouterFactory
    ),
    managementShippingMethodsCreate: asFunction(
      ManagementShippingMethodsCreateFactory
    ),
    managementShippingMethodsDelete: asFunction(
      ManagementShippingMethodsDeleteFactory
    ),
    managementShippingMethodsGetMany: asFunction(
      ManagementShippingMethodsGetManyFactory
    ),
    managementShippingMethodsGetOne: asFunction(
      ManagementShippingMethodsGetOneFactory
    ),
    managementShippingMethodsPublish: asFunction(
      ManagementShippingMethodsPublishFactory
    ),
    managementShippingMethodsUnpublish: asFunction(
      ManagementShippingMethodsUnpublishFactory
    ),
    managementShippingMethodsUpdate: asFunction(
      ManagementShippingMethodsUpdateFactory
    ),

    // MANAGEMENT API STORES
    managementStoresRouter: asFunction(ManagementStoresRouterFactory),
    managementStoresCreate: asFunction(ManagementStoresCreateFactory),
    managementStoresGetOne: asFunction(ManagementStoresGetOneFactory),
    managementStoresPublish: asFunction(ManagementStoresPublishFactory),
    managementStoresUnpublish: asFunction(ManagementStoresUnpublishFactory),
    managementStoresUpdate: asFunction(ManagementStoresUpdateFactory)
  };

  container = createContainer();

  container.register(dependencies);

  return container;
};
