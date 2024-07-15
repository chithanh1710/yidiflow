export interface IQuestionType {
  _id: number;
  title: string;
  tags: {
    _id: number;
    name: string;
  }[];
  author: string;
  upVotes: number;
  answers: number;
  views: number;
  createAt: string;
}
