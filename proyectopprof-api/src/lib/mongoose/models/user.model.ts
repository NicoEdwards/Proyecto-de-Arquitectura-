import mongoose, { HydratedDocument, InferSchemaType, Schema } from "mongoose";

// Types
export type UserDocument = HydratedDocument<InferSchemaType<typeof schema>>;

const schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bankIds: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<typeof schema>("User", schema);
