import { UserDocument, UserModel } from "@/lib/mongoose/models/user.model.ts";
import { isUniqueViolationError } from "@/lib/mongoose/utils/db-error-checks.ts";
import { CreateUser, UpdateUser } from "@/lib/zod/schemas/users.schema.ts";
import { HttpErrorWithDetails } from "@/utils/http-error-with-details.ts";
import { STATUS_CODE } from "@std/http";
import * as bcrypt from "bcrypt/mod.ts";

class UsersService {
  public get = async (id: string) => {
    // Get user and check if exists
    const record = await UserModel.findById(id);
    if (!record) throw this.notFoundError();

    // Return user without password
    return this.omitPassword(record);
  };

  public getByEmailWithPassword = async (email: string) => {
    // Get user and check if exists
    const record = await UserModel.findOne({ email });
    if (!record) throw this.notFoundError();

    // Return user
    return record;
  };

  public create = async ({ password, ...restOfData }: CreateUser) => {
    try {
      // Hash password
      const hashedPassword = bcrypt.hashSync(password);

      // Create user
      const createdRecord = await UserModel.create({
        ...restOfData,
        password: hashedPassword,
      });

      // Return created user without password
      return this.omitPassword(createdRecord);
    } catch (err) {
      // Check uniqueness, if not throw specific error
      if (isUniqueViolationError(err)) {
        throw new HttpErrorWithDetails({
          message: "Email already in use",
          status: STATUS_CODE.Conflict,
        });
      }

      // Throw generic error
      throw err;
    }
  };

  public update = async (
    id: string,
    { password, ...restOfData }: UpdateUser,
  ) => {
    const payload = {
      ...restOfData,
      ...(password && { password: bcrypt.hashSync(password) }),
    };

    // Update user and check if exists
    const updatedRecord = await UserModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!updatedRecord) throw this.notFoundError();

    // Return updated user without password
    return this.omitPassword(updatedRecord);
  };

  private omitPassword = (user: UserDocument) => {
    const { password: _, ...restOfUser } = user.toObject();
    return restOfUser;
  };

  private notFoundError = () =>
    new HttpErrorWithDetails({
      message: "User not found",
      status: STATUS_CODE.NotFound,
    });
}

export const usersService = new UsersService();
