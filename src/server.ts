import { Hono } from "hono";

export const app = new Hono();

export const getHelloHono = app.get("/", (c) => {
  return c.text("Hello Hono!");
});
