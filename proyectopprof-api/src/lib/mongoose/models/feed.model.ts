import mongoose, { InferSchemaType, Schema } from "mongoose";

// Types
export type FeedInsert = Omit<
  InferSchemaType<typeof schema>,
  "createdAt" | "updatedAt"
>;

const schema = new Schema(
  {
    bankId: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true },
);

export const FeedModel = mongoose.model<typeof schema>("Feed", schema);
