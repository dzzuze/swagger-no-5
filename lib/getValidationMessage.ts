export type ValidationResult = {
  title: string;
  description: string;
};

export default function getValidationMessage(error: Error): ValidationResult {
  const message = error.message;

  if (message.includes('must have required property')) {
    return {
      title: 'The OpenAPI schema is incomplete',
      description: 'Some required fields are missing.',
    };
  }
  if (message.includes('must be object')) {
    return {
      title: 'Incomplete endpoint',
      description:
        'Each HTTP method (GET, POST, etc.) must contain an object with its definition.',
    };
  }

  return {
    title: 'Schema validation failed',
    description: error.message,
  };
}
