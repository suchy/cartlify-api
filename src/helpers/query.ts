export type Query<T> = {
  [fieldName in keyof T]?: Filter;
};

type Filter =
  | number
  | string
  | boolean
  | {
      [key in OPERATOS]?:
        | number
        | string
        | boolean
        | number[]
        | string[]
        | boolean[];
    };

enum OPERATOS {
  gt = 'gt',
  gte = 'gte',
  lt = 'lt',
  lte = 'lte',
  in = 'in',
  all = 'all'
}

export type FieldsOption<T> = keyof T;

export interface QueryOptions<T> {
  sortBy?: FieldsOption<T>;
  sortDir?: 'asc' | 'dsc';
  page?: number;
  perPage?: number;
}

export type QueryOneOptions<T> = Omit<QueryOptions<T>, 'page' | 'perPage'>;

export interface RequestQuery<T> extends QueryOptions<T> {
  fields?: FieldsOption<T>[];
}

export interface RequestQueryOne<T> {
  fields?: FieldsOption<T>[];
}
