import type { ValidationErrorResponse } from "@/types/error";
import type { Context } from "hono";
import type { z, ZodSchema } from "zod";

export function zValidator<TSchema extends ZodSchema>(zSchema: TSchema) {
  return async (value: unknown, c: Context) => {
    const parsed = zSchema.safeParse(value);
    if (!parsed.success) {
      const errorRespponse: ValidationErrorResponse = {
        success: false,
        error: {
          name: "ValidationError",
          fields: parsed.error.flatten().fieldErrors,
        },
      };
      return c.json(errorRespponse, 422);
    }
    return parsed.data as z.infer<TSchema>;
  };
}
