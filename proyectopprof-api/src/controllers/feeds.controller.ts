import { feedsService } from "@/service/feeds.service.ts";
import { Context } from "@oak/oak";

class FeedsController {
  public getAllByUserId = async (ctx: Context) => {
    const userId = ctx.state.user.id; // Get user id from authenticate middleware

    // Get query params
    const queryEntries = ctx.request.url.searchParams.entries();
    const ctxQuery = Object.fromEntries(queryEntries);

    const response = await feedsService.getAllByUserId(userId, ctxQuery); // Get response

    // Response
    ctx.response.body = response;
  };
}

export const feedsController = new FeedsController();
