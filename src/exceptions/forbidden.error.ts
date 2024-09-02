export class ForbiddenError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "ForbiddenError";
  }
}
