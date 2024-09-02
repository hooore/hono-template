export class UnprocessableError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "UnprocessableError";
  }
}
