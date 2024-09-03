export type TErrorResponse<T> = {
  success: boolean;
  error: T;
};

export type ErrorResponse = TErrorResponse<{
  name: string;
  message: string;
}>;

export type ValidationErrorResponse = TErrorResponse<{
  name: string;
  fields: object;
}>;
