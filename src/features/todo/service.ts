import type { ITodoRepository } from "./repository";
import type { CreateTodoSchema, UpdateTodoSchema } from "./request.schema";
import { Todo } from "./model";
import type { IIdentifer } from "@/lib/identifer";
import type { IFileStorage } from "@/lib/file-storage";

export interface ITodoService {
  Create(request: CreateTodoSchema): Promise<string>;
  GetAll(): Promise<Todo[]>;
  UpdateById(todoId: string, request: UpdateTodoSchema): Promise<string>;
  GetById(todoId: string): Promise<Todo>;
  DeleteById(todoId: string): Promise<string>;
}

export class TodoService implements ITodoService {
  #identifier: IIdentifer;
  #fileStorage: IFileStorage;
  #todoRepository: ITodoRepository;

  constructor(
    identifier: IIdentifer,
    fileStorage: IFileStorage,
    todoRepository: ITodoRepository,
  ) {
    this.#identifier = identifier;
    this.#fileStorage = fileStorage;
    this.#todoRepository = todoRepository;
  }

  async Create({ note }: CreateTodoSchema): Promise<string> {
    const todoID = this.#identifier.Generate();
    const todo = new Todo(todoID, note, "");
    await this.#todoRepository.Insert(todo);
    return todoID;
  }

  async GetAll(): Promise<Todo[]> {
    return await this.#todoRepository.GetAll();
  }

  async UpdateById(
    todoId: string,
    { note, attachment }: UpdateTodoSchema,
  ): Promise<string> {
    const attachmentUrl = await this.#fileStorage.Upload(attachment);
    const todo = new Todo(todoId, note, attachmentUrl);
    await this.#todoRepository.Update(todoId, todo);
    return todoId;
  }

  async GetById(todoId: string): Promise<Todo> {
    return await this.#todoRepository.GetById(todoId);
  }

  async DeleteById(todoId: string): Promise<string> {
    await this.#todoRepository.DeleteById(todoId);
    return todoId;
  }
}
