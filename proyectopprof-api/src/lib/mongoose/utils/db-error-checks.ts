import { MongoServerError } from "mongodb";

export const isUniqueViolationError = (error: unknown) =>
  error instanceof MongoServerError && error.code === 11000;
