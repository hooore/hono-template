export interface IIdentifer {
  Generate(): string;
}

export class ULID implements IIdentifer {
  Generate(): string {
    return "random";
  }
}
