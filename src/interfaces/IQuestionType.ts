export interface IQuestionType {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: { _id: string; picture: string; name: string };
  upVotes: number;
  answers: Array<Object>;
  views: number;
  createAt: Date;
}
