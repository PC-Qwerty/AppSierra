export const createError = (statusCode: number, errorMessage: string) => {
  const error = new Error(errorMessage);
  Object.assign(error, { statusCode });
  return error;
};
