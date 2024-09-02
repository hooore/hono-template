import { Hono } from "hono";
import { type Promisify, type RateLimitInfo } from "hono-rate-limiter";
import type { JwtVariables } from "hono/jwt";

export const app = new Hono<{
  Variables: JwtVariables & {
    rateLimit: RateLimitInfo;
    rateLimitStore: {
      get?: (key: string) => Promisify<RateLimitInfo | undefined>;
      resetKey: (key: string) => Promisify<void>;
    };
  };
}>();

export type AppType = typeof app;
