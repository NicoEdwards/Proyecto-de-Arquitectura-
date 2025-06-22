import { HttpErrorWithDetails } from "@/utils/http-error-with-details.ts";
import { Context, Next } from "@oak/oak";
import { STATUS_CODE } from "@std/http";

export const globalErrorHandler = async (ctx: Context, next: Next) => {
  try {
    return await next();
  } catch (err) {
    // Conditions
    const isHttpError = err instanceof HttpErrorWithDetails;
    const isError = err instanceof Error;

    // Response
    ctx.response.status = isHttpError
      ? err.status
      : STATUS_CODE.InternalServerError;
    ctx.response.body = {
      message: isError ? err.message : "Internal server error",
      details: isHttpError ? err.details : undefined,
    };
  }
};
