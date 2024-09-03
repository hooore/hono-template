import { NotFoundError } from "@/exceptions/not-found.error";
import { Todo } from "./model";
import type { TodoTable } from "@/types/todo-table";

export interface ITodoRepository {
  Insert(todo: Todo): Promise<void>;
  Update(todoId: string, todo: Todo): Promise<void>;
  GetById(todoId: string): Promise<Todo>;
  GetAll(): Promise<Todo[]>;
  DeleteById(todoId: string): Promise<void>;
}

export class TodoRepository implements ITodoRepository {
  async Insert(_: Todo): Promise<void> {
    await Promise.resolve();
  }

  async Update(todoId: string, _: Todo): Promise<void> {
    const result = await Promise.resolve(Math.random());
    if (result === 0) {
      throw new NotFoundError(`todo with ${todoId} id not found.`);
    }
  }

  async GetById(todoId: string): Promise<Todo> {
    const result = await Promise.resolve(Math.random());
    if (result === 0) {
      throw new NotFoundError(`todo with ${todoId} id not found.`);
    }

    return new Todo("todo.id", "todo.note", "todo.attachment");
  }

  async GetAll(): Promise<Todo[]> {
    const todos = await Promise.resolve<TodoTable[]>([]);

    return todos.map((todo) => {
      return new Todo(todo.id, todo.note, todo.attachment);
    });
  }

  async DeleteById(todoId: string): Promise<void> {
    const result = await Promise.resolve(Math.random());
    if (result === 0) {
      throw new NotFoundError(`todo with ${todoId} id not found.`);
    }
  }
}
