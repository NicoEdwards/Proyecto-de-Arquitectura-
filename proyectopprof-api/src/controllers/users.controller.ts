import { usersService } from "@/service/users.service.ts";
import { Context } from "@oak/oak";
import { STATUS_CODE } from "@std/http";

class UsersController {
  public get = async (ctx: Context) => {
    const userId = ctx.state.user.id; // Get user id from authenticate middleware
    const response = await usersService.get(userId); // Get response

    // Response
    ctx.response.body = response;
  };

  public create = async (ctx: Context) => {
    const body = await ctx.request.body.json(); // Get body
    const response = await usersService.create(body); // Get response

    // Response
    ctx.response.status = STATUS_CODE.Created;
    ctx.response.body = {
      message: `User ${response.email} created successfully`,
    };
  };

  public update = async (ctx: Context) => {
    const userId = ctx.state.user.id; // Get user id from authenticate middleware
    const body = await ctx.request.body.json(); // Get body
    const response = await usersService.update(userId, body); // Get response

    // Response
    ctx.response.body = {
      message: `User ${response.email} updated successfully`,
    };
  };
}

export const usersController = new UsersController();
