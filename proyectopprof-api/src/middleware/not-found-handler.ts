import { HttpErrorWithDetails } from "@/utils/http-error-with-details.ts";
import { Context, Next } from "@oak/oak";
import { STATUS_CODE } from "@std/http/status";

export const notFoundHandler = async (ctx: Context, next: Next) => {
  await next();

  if (ctx.response.body === undefined) {
    throw new HttpErrorWithDetails({
      message: "Not found",
      status: STATUS_CODE.NotFound,
    });
  }
};
