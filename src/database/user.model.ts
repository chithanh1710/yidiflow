import mongoose, { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  userName: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  bio: { type: String, required: false },
  picture: { type: String, required: true },
  location: { type: String, required: false },
  portfolioWebsite: { type: String, required: false },
  reputation: { type: Number, required: false, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question", required: true }],
  joinedAt: { type: Date, required: true, default: Date.now },
});

const User = (models.User ||
  model<IUser>("User", UserSchema)) as mongoose.Model<
  IUser,
  {},
  {},
  {},
  mongoose.Document<unknown, {}, IUser> & IUser & Required<{ _id: unknown }>,
  any
>;

export default User;
