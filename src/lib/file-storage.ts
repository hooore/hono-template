export interface IFileStorage {
  Upload(file: File): Promise<string>;
}

export class FileStorage implements IFileStorage {
  constructor() {}

  async Upload(_: File): Promise<string> {
    return "random";
  }
}
