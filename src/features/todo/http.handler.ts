import type { AppType } from "@/app";
import { zValidator } from "@/middlewares/zod-validator";
import { validator } from "hono/validator";
import { Hono, type MiddlewareHandler } from "hono";
import { createTodoSchema, updateTodoSchema } from "./request.schema";
import type { ITodoService } from "./service";
import type { MutationResponse, TodoResponse } from "./response.schema";

type InitTodoHttpHandlerOptions = {
  todoService: ITodoService;
};

export function initTodoHttpHandler(
  { todoService }: InitTodoHttpHandlerOptions,
  ...midlewareHandler: MiddlewareHandler[]
) {
  const apiRoute: AppType = new Hono();

  apiRoute.use("*", ...midlewareHandler);

  const createHandler = apiRoute.post(
    "/",
    validator("json", zValidator(createTodoSchema)),
    async (c) => {
      const data = c.req.valid("json");
      const todoId = await todoService.Create(data);
      const response: MutationResponse = {
        id: todoId,
      };

      return c.json(response, 200);
    },
  );

  const getAllHandler = apiRoute.get("/", async (c) => {
    const todos = await todoService.GetAll();
    const todosResponse: TodoResponse[] = todos.map((todo) => {
      return {
        id: todo.GetId(),
        note: todo.GetNote(),
        attachment: todo.GetAttachment(),
      };
    });

    return c.json(todosResponse, 200);
  });

  const getByIdHandler = apiRoute.get("/:todoId", async (c) => {
    const todoId = c.req.param("todoId");
    const todo = await todoService.GetById(todoId);
    const todoResponse: TodoResponse = {
      id: todo.GetId(),
      note: todo.GetNote(),
      attachment: todo.GetAttachment(),
    };

    return c.json(todoResponse, 200);
  });

  const deleteByIdHandler = apiRoute.delete("/:todoId", async (c) => {
    const todoId = c.req.param("todoId");
    await todoService.DeleteById(todoId);
    const response: MutationResponse = {
      id: todoId,
    };

    return c.json(response, 200);
  });

  const updateHandler = apiRoute.put(
    "/:todoId",
    validator("form", zValidator(updateTodoSchema)),
    async (c) => {
      const todoId = c.req.param("todoId");
      const data = c.req.valid("form");
      await todoService.UpdateById(todoId, data);
      const response: MutationResponse = {
        id: todoId,
      };

      return c.json(response, 200);
    },
  );

  return {
    apiRoute,
    createHandler,
    getAllHandler,
    updateHandler,
    getByIdHandler,
    deleteByIdHandler,
  };
}
