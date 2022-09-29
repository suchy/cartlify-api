describe('exposition-carts', () => {
  describe('POST /exposition/carts', () => {
    it('should create and return the cart', () => {
      // const data = { products: [{ productId: 'sdfsdfsd', quantity: 11 }]}
    });

    it('should return error if product quantity is greater than stock', () => {});

    it('should return error if product was not found', () => {});
  });

  describe('GET /exposition/carts/:cartId', () => {
    it('should return cart', () => {
      // const cart = {
      //   products: [
      //     {id: string;
      //       name: string;
      //       description: string;
      //       price: number;
      //       quantity: number;
      //       value: number;}
      //     ],
      //   productsCount: 2,
      //   itemsCount: 9,
      //   cartValue: 100,
      //   createdAt: '',
      //   updatedAt: '',
      // };
    });

    it('should return "not found" error if cart was not found', () => {});

    describe('fields selecting', () => {
      it('should return all fields on the cart by default', () => {});

      it('should allow to define fields to be returned for the cart', () => {});
    });
  });

  describe('PUT /exposition/carts/:cartId', () => {
    it('should return the updated cart', () => {
      // const data = { products: [{ productId: 'sdfsdfsd', quantity: 5 }]}
    });

    it('should return "not found" error if cart was not found', () => {});

    it('should return error if product quantity is greater than stock', () => {});

    it('should return error if product was not found', () => {});
  });
});
