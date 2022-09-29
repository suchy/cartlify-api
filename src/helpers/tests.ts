export const getAsyncError = async (fn: () => void): Promise<Error> => {
  let resultError;

  try {
    await fn;
  } catch (error) {
    resultError = error;
  }

  return resultError;
};

export const getFieldValidationErros = async (
  fn: () => void,
  field: string
): Promise<Error[]> => {
  const error = await getAsyncError(fn);
  if (!error) return [];
  // @ts-ignore-line
  return error.details.errors.filter((error: any) => error.field === field);
};
