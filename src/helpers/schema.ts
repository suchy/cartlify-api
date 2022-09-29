import { JSON_MIME_TYPE } from '../constants';

export const FILTER_PARAM_STRING_SCHEMA = {
  oneOf: [
    { type: 'string' },
    {
      type: 'object',
      properties: {
        all: { type: 'array', items: { type: 'string' } },
        in: { type: 'array', items: { type: 'string' } }
      }
    }
  ]
};

export const FILTER_PARAM_NUMBER_SCHEMA = {
  oneOf: [
    { type: 'number' },
    {
      type: 'object',
      properties: {
        lt: { type: 'number' },
        lte: { type: 'number' },
        gt: { type: 'number' },
        gte: { type: 'number' },
        in: { type: 'array', items: { type: 'number' } }
      }
    }
  ]
};

export const FILTER_PARAM_BOOL_SCHEMA = {
  type: 'boolean'
};

export const FILTER_PARAM_DATE_SCHEMA = {
  oneOf: [
    { type: 'string', format: 'date-time' },
    {
      type: 'object',
      properties: {
        lt: { type: 'string', format: 'date-time' },
        lte: { type: 'string', format: 'date-time' },
        gt: { type: 'string', format: 'date-time' },
        gte: { type: 'string', format: 'date-time' },
        in: {
          type: 'array',
          items: { type: 'string', format: 'date-time' }
        }
      }
    }
  ]
};

export const QueryFieldsParamFactory = (fields: string[]) => ({
  name: 'fields',
  in: 'query',
  description: 'lorem ipsum',
  required: false,
  style: 'form',
  explode: true,
  schema: {
    type: 'array',
    items: {
      type: 'string',
      enum: fields
    }
  }
});

export const QueryFiltersParamFactory = (filters: any[]) =>
  filters.map((filter) => {
    return {
      name: filter.name,
      in: 'query',
      description: filter.description,
      required: false,
      style: 'form',
      explode: true,
      schema: filter.schema
    };
  });

export const QuerySortParamsFactory = (fields: string[]) => [
  {
    name: 'sortBy',
    in: 'query',
    description: 'lorem ipsum',
    required: false,
    style: 'form',
    explode: true,
    schema: {
      type: 'array',
      items: {
        type: 'string',
        enum: fields
      }
    }
  },
  {
    name: 'sortDir',
    in: 'query',
    description: 'lorem ipsum',
    required: false,
    style: 'form',
    explode: true,
    schema: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['asc', 'dsc']
      }
    }
  },
  {
    name: 'page',
    in: 'query',
    description: 'lorem ipsum',
    required: false,
    style: 'form',
    explode: true,
    schema: {
      type: 'number',
      minimum: 1
    }
  },
  {
    name: 'perPage',
    in: 'query',
    description: 'lorem ipsum',
    required: false,
    style: 'form',
    explode: true,
    schema: {
      type: 'number',
      minimum: 1,
      maximum: 100
    }
  }
];

export const SECURITY_SCHEMA = [{ OAuth2: [] }];

export const PathIdParamFactory = (name: string, description?: string) => ({
  name,
  in: 'path',
  description,
  required: true,
  schema: {
    type: 'string',
    format: 'uuid'
  }
});

export const STORE_ID_PARAM = PathIdParamFactory('storeId');

export const RequestBodyFactory = (modelSchema: any, description: string) => {
  const {
    id,
    createdAt,
    storeId,
    updatedAt,
    ...properties
  } = modelSchema.properties;

  const required = Object.keys(properties);

  const schema = { ...modelSchema, required, properties };

  return {
    description,
    content: {
      [JSON_MIME_TYPE]: { schema }
    }
  };
};

export const ArrayResponseFactory = (
  modelName: string,
  description: string
) => ({
  description,
  content: {
    [JSON_MIME_TYPE]: {
      schema: {
        type: 'array',
        items: { $ref: `#/components/schemas/${modelName}` }
      }
    }
  }
});

export const ItemRensponseFactory = (
  modelName: string,
  description: string,
  examples?: object
) => ({
  description,
  content: {
    [JSON_MIME_TYPE]: {
      schema: { $ref: `#/components/schemas/${modelName}` },
      examples
    }
  }
});
