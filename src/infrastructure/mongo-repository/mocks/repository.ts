export const Repository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  findOneById: jest.fn(),
  deleteOne: jest.fn(),
  deleteOneById: jest.fn(),
  create: jest.fn(),
  updateOneById: jest.fn()
});
