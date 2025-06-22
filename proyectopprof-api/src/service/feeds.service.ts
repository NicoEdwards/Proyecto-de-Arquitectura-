import { FeedInsert, FeedModel } from "@/lib/mongoose/models/feed.model.ts";
import { GetAllUsers } from "@/lib/zod/schemas/feeds.schema.ts";
import { isUniqueViolationError } from "../lib/mongoose/utils/db-error-checks.ts";
import { usersService } from "./users.service.ts";

class FeedsService {
  public getAllByUserId = async (
    userId: string,
    { limit = 9, page = 1, search = "" }: GetAllUsers,
  ) => {
    // Get user
    const user = await usersService.get(userId);

    // Define filters
    const like = { $regex: search, $options: "i" };
    const filters = {
      bankId: { $in: user.bankIds },
      ...(search &&
        { $or: [{ title: like }, { description: like }, { bankId: like }] }),
    };

    // Query count
    const count = await FeedModel.countDocuments(filters);

    // Define results
    const positiveLimit = Math.max(limit, 1);
    const totalPages = Math.ceil(count / positiveLimit) || 1;
    const currentPage = Math.max(1, Math.min(page, totalPages));
    const results = {
      total: count,
      limit: positiveLimit,
      page: currentPage,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      totalPages,
    };

    // Check count, if 0 return results without data
    if (!count) return { data: [], ...results };

    // Query data
    const data = await FeedModel.find(filters).limit(positiveLimit).skip(
      (currentPage - 1) * positiveLimit,
    );
    return { data, ...results };
  };

  public insertAndSkipDuplicates = async (benefits: FeedInsert[]) => {
    try {
      // Return inserted data
      return await FeedModel.insertMany(benefits, { ordered: false });
    } catch (err) {
      // Check uniqueness, if not throw specific error
      if (!isUniqueViolationError(err)) throw err;
      console.log("Skipping duplicate");
    }
  };
}

export const feedsService = new FeedsService();
