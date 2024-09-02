export class UnauthorizedError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "UnauthorizedError";
  }
}
