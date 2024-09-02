export type ErrorResponse = {
  success: boolean;
  error: {
    name: string;
    message: string;
  };
};
