import request from 'supertest';
import { ContainerFactory } from '../../../../container';

describe('exposition-products', () => {
  let container: any;
  let apiRequest: any;

  beforeEach(async () => {
    container = await ContainerFactory();
    const api = await container.resolve('api');
    apiRequest = request(api);
  });

  afterEach(async () => {
    const dbConnection = await container.resolve('dbConnection');
    dbConnection.close();
  });

  describe('GET /exposition/products', () => {
    it('should get products list', async () => {
      const resposne = await apiRequest.get('/exposition/products');

      console.log(resposne.body);
      // @ts-ignore
      // expect(resposne.statusCode).toBe(200);
    });

    describe('pagination', () => {
      it('should get first page with 50 products by default', () => {});

      it('should allow to define page number', () => {});

      it('should allow to define number of products per page', () => {});
    });

    describe('sorting', () => {
      it('should get products list sorted by name by default', () => {});

      it('should allow to define the field to sort by', () => {});

      it('should allow to define the order of sorting', () => {});
    });

    describe('filtering', () => {
      it('should allow to define the fields used to filter the products list', () => {});
    });

    describe('fields selecting', () => {
      it('should return all fields on the product list by default', () => {});

      it('should allow to define fields to be returned on the products list', () => {});
    });
  });

  describe('GET /exposition/products/stock', () => {
    it('should get products stock list', () => {});

    describe('pagination', () => {
      it('should get first page with 50 products by default', () => {});

      it('should allow to define page number', () => {});

      it('should allow to define number of products stock per page', () => {});
    });

    describe('sorting', () => {
      it('should get products stock list sorted by name by default', () => {});

      it('should allow to define the field to sort by', () => {});

      it('should allow to define the order of sorting', () => {});
    });

    describe('filtering', () => {
      it('should allow to define the fields used to filter the products stock list', () => {});
    });
  });

  describe('GET /exposition/products/:productId', () => {
    it('should return product', () => {});

    it('should return "not found" error if product was not found', () => {});

    describe('fields selecting', () => {
      it('should return all fields on the product by default', () => {});

      it('should allow to define fields to be returned for the product', () => {});
    });
  });

  describe('GET /exposition/products/:productId/stock', () => {
    it('should return product stock', () => {});

    it('should return "not found" error if product was not found', () => {});
  });
});
