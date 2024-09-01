import { serve } from "@hono/node-server";
import { app } from "./server";

const PORT = Number(process.env.PORT);
const HOSTNAME = process.env.HOSTNAME;
console.log(`Server is running on port ${PORT}`);

serve({
  fetch: app.fetch,
  hostname: HOSTNAME,
  port: PORT,
});
