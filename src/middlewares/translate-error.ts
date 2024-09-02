import { ForbiddenError } from "@/exceptions/forbidden.error";
import { NotFoundError } from "@/exceptions/not-found.error";
import { UnauthorizedError } from "@/exceptions/unauthorized.error";
import type { StatusCode } from "hono/utils/http-status";
import type { ErrorResponse } from "@/types/error";
import { UnprocessableError } from "@/exceptions/unprocessable.error";

export function translateError(error: Error) {
  let code: StatusCode = 500;
  const errors: ErrorResponse = {
    success: false,
    error: {
      name: error.name,
      message: error.message,
    },
  };

  if (error instanceof UnauthorizedError) {
    code = 401;
  }

  if (error instanceof ForbiddenError) {
    code = 403;
  }

  if (error instanceof NotFoundError) {
    code = 404;
  }

  if (error instanceof UnprocessableError) {
    code = 422;
  }

  return new Response(JSON.stringify(errors), { status: code });
}
