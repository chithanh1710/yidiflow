import { Schema, models, model, Document, Model } from "mongoose";

export interface IQuestion extends Document {
  title: string;
  content: string;
  tags: Schema.Types.ObjectId[];
  views: number;
  upVotes: Schema.Types.ObjectId[];
  downVotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  answers: Schema.Types.ObjectId[];
  createAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  views: { type: Number, default: 0 },
  upVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answers" }],
  createAt: { type: Date, default: Date.now },
});

const Question = (models.Question ||
  model<IQuestion>("Question", QuestionSchema)) as Model<
  IQuestion,
  {},
  {},
  {},
  Document<unknown, {}, IQuestion> &
    IQuestion &
    Required<{
      _id: Schema.Types.ObjectId;
    }>,
  any
>;

export default Question;
