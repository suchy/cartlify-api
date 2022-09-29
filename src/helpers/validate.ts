import Ajv from 'ajv';

interface ValidateFactoryDependencies {
  throwValidationFailedError: any;
}

export type validate = (schema: object, input: any, message: string) => void;

export type ValidateFactory = (
  dependencies: ValidateFactoryDependencies
) => validate;

export const ValidateFactory: ValidateFactory = ({
  throwValidationFailedError
}) => (schema, input, message) => {
  const ajv = new Ajv();
  const isValid = ajv.validate(schema, input);

  if (!isValid) {
    throwValidationFailedError(message, { errors: ajv.errors });
  }

  return true;
};
