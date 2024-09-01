import { testClient } from "hono/testing";
import { getHelloHono } from "./server";

it("test", async () => {
  const res = await testClient(getHelloHono).index.$get();
  expect(await res.text()).toStrictEqual("Hello Hono!");
});
