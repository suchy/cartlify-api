import { FieldsOption } from './query';

export const filterFields = <T extends {}>(fields?: FieldsOption<T>[]) => (
  entity: T
) => {
  if (!fields || !Array.isArray(fields) || !fields.length) {
    return entity;
  }

  const filteredObject = fields.reduce((acc: Partial<T>, field) => {
    if (entity.hasOwnProperty(field)) {
      acc[field] = entity[field];
    }

    return acc;
  }, {});

  return filteredObject;
};
