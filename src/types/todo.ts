export class Todo {
  #id: string;
  #note: string;
  #attachment: string;

  constructor(id: string, note: string, attachment: string) {
    this.#id = id;
    this.#note = note;
    this.#attachment = attachment;
  }

  GetId(): string {
    return this.#id;
  }

  GetNote(): string {
    return this.#note;
  }

  GetAttachment(): string {
    return this.#attachment;
  }
}
