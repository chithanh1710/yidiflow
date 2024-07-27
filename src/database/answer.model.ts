import { Document, Model, model, models, Schema } from "mongoose";

export interface IAnswer extends Document {
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  content: string;
  upVotes: Schema.Types.ObjectId[];
  downVotes: Schema.Types.ObjectId[];
  createAt: Date;
}

const AnswerSchema = new Schema<IAnswer>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  content: { type: String, required: true },
  upVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createAt: { type: Date, default: Date.now },
});

const Answer = (models.Answer ||
  model<IAnswer>("Answer", AnswerSchema)) as Model<
  IAnswer,
  {},
  {},
  {},
  Document<unknown, {}, IAnswer> &
    IAnswer &
    Required<{
      _id: Schema.Types.ObjectId;
    }>,
  any
>;

export default Answer;
