import { testClient } from "hono/testing";
import { initTodoHttpHandler } from "./http.handler";
import type { ITodoService } from "./service";
import { Todo } from "@/types/todo";

const todoId = "random";

const todoServiceMock: ITodoService = {
  Create: async () => {
    return todoId;
  },
  DeleteById: async () => {
    return todoId;
  },
  GetAll: async () => {
    return [new Todo(todoId, "", "")];
  },
  GetById: async () => {
    return new Todo(todoId, "", "");
  },
  UpdateById: async () => {
    return todoId;
  },
};

const handler = initTodoHttpHandler({
  todoService: todoServiceMock,
});

it("test create todo", async () => {
  const res = await testClient(handler.createHandler).index.$post({
    json: { note: "random" },
  });
  expect(await res.text()).toStrictEqual(
    JSON.stringify({
      id: todoId,
    }),
  );
});

it("test get all todo", async () => {
  const res = await testClient(handler.getAllHandler).index.$get();
  expect(await res.text()).toStrictEqual(
    JSON.stringify([
      {
        id: todoId,
        note: "",
        attachment: "",
      },
    ]),
  );
});

it("test get todo by id", async () => {
  const res = await testClient(handler.getByIdHandler)[":todoId"].$get({
    param: { todoId },
  });
  expect(await res.text()).toStrictEqual(
    JSON.stringify({
      id: todoId,
      note: "",
      attachment: "",
    }),
  );
});

it("test delete todo by id", async () => {
  const res = await testClient(handler.deleteByIdHandler)[":todoId"].$delete({
    param: { todoId },
  });
  expect(await res.text()).toStrictEqual(
    JSON.stringify({
      id: todoId,
    }),
  );
});

it("test update todo", async () => {
  const res = await testClient(handler.updateHandler)[":todoId"].$put({
    param: { todoId },
    form: {
      note: "random",
      attachment: new File(["test.jpeg"], "test.jpeg", { type: "image/jpeg" }),
    },
  });
  expect(await res.text()).toStrictEqual(
    JSON.stringify({
      id: todoId,
    }),
  );
});
