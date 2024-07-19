import { Document, Model, model, models, Schema } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[];
  follower: Schema.Types.ObjectId[];
  createdOn: Date;
}

const TagSchema = new Schema<ITag>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question", required: true }],
  follower: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  createdOn: { type: Date, required: true, default: Date.now },
});

const Tag = (models.Tag || model<ITag>("Tag", TagSchema)) as Model<
  ITag,
  {},
  {},
  {},
  Document<unknown, {}, ITag> &
    ITag &
    Required<{
      _id: unknown;
    }>,
  any
>;

export default Tag;
