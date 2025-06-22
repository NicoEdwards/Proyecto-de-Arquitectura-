import { HttpErrorWithDetails } from "@/utils/http-error-with-details.ts";
import { Next, RouteParams, RouterContext } from "@oak/oak";
import { STATUS_CODE } from "@std/http/status";
import { AnyZodObject, ZodError, ZodIssue } from "zod";

// Types
interface ValidateWithZodProps {
  params?: AnyZodObject;
  query?: AnyZodObject;
  body?: AnyZodObject;
}

export const validateWithZod = ({
  params,
  query,
  body,
}: ValidateWithZodProps) => {
  return async <T extends string>(ctx: RouterContext<T>, next: Next) => {
    try {
      if (params) {
        ctx.params = params.parse(ctx.params) as RouteParams<T>;
      }

      if (query) {
        const queryEntries = ctx.request.url.searchParams.entries();
        const ctxQuery = Object.fromEntries(queryEntries);
        ctx.state.query = query.parse(ctxQuery);
      }

      if (body) {
        const ctxBody = await ctx.request.body.json();
        ctx.state.body = body.parse(ctxBody);
      }

      // Succeeded
      return await next();
    } catch (err) {
      // Failed: zod error
      if (err instanceof ZodError) {
        const details = err.errors.map((issue: ZodIssue) => ({
          field: `${issue.path.join(".")}`,
          message: issue.message,
        }));
        throw new HttpErrorWithDetails({
          message: "Unprocessable",
          status: STATUS_CODE.UnprocessableEntity,
          details,
        });
      }

      // Failed: internal error
      throw err;
    }
  };
};
