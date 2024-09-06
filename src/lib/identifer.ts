export interface IIdentifer {
  Generate(): string;
}

export class Identifier implements IIdentifer {
  Generate(): string {
    return "random";
  }
}
