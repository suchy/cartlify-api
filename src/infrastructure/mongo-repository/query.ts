// const getFieldName = (fieldName: string) =>
//   fieldName === 'id' ? 'id' : fieldName;

const parseValue = (value: number | string) => {
  if (typeof value === 'number') {
    return value;
  }

  if (/^[+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*)(?:[eE][+-]?\d+)?$/.test(value)) {
    return parseFloat(value);
  }

  return value;
  // const parsed = parseFloat(value);

  // return isNaN(parsed) ? value : parsed;
};

const getFilterOperator = (filterOperator: any, [operator, value]: any) => {
  const operators = ['gt', 'gte', 'lt', 'lte', 'in', 'all'];

  if (
    operators.includes(operator) &&
    (typeof value === 'string' || typeof value === 'number')
  ) {
    // @ts-ignore
    filterOperator[`$${operator}`] = parseValue(value);
  }

  if (operators.includes(operator) && Array.isArray(value)) {
    filterOperator[`$${operator}`] = value;
  }

  return filterOperator;
};

const getFilterOperators = (filter: any) => {
  const filterToArray = Object.entries(filter);
  const filterOperators = filterToArray.reduce(getFilterOperator, {});
  return filterOperators;
};

export const buildQuery = (filters: any) => {
  const filtersToArray = Object.entries(filters);
  const query = filtersToArray.reduce((acc, [fieldName, filter]) => {
    // @ts-ignore
    if (typeof filter === 'boolean') {
      // @ts-ignore
      acc[fieldName] = filter;
      return acc;
    }

    // if (Array.isArray(filter)) {
    //   // @ts-ignore
    //   acc[fieldName] = { $all: filter };

    //   return acc;
    // }

    if (typeof filter === 'object' && filter !== null) {
      const filterOperators = getFilterOperators(filter);
      // @ts-ignore
      acc[fieldName] = filterOperators;

      return acc;
    }
    // @ts-ignore
    acc[fieldName] = parseValue(filter);

    return acc;
  }, {});

  return query;
};
