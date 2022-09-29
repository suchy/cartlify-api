// interface Query {

// }

type Query<T> = any;

type FieldsOption<T> = keyof T;

interface QueryOptions<T> {
  fields?: FieldsOption<T>[];
  sortBy?: FieldsOption<T>;
  sortDir?: 'asc' | 'dsc';
  page?: number;
  perPage?: number;
}

type QueryOneOptions<T> = Omit<QueryOptions<T>, 'page' | 'perPage'>;

export interface Repository<T> {
  find: (query: Query<T>, options: QueryOptions<T>) => Promise<T[]>;
  findOne: (query: Query<T>, options: QueryOneOptions<T>) => Promise<T | null>;
  delete: (query: Query<T>) => Promise<boolean>;
  insert: (input: any) => Promise<T>;
  update: (query: Query<T>, input: any) => Promise<T>;
  count: (query: Query<T>) => Promise<number>;
}
