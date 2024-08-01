import AnswerCard from "@/components/cards/AnswerCard";
import { getAllAnswerById } from "@/lib/actions/answer.action";
import { getIdToString } from "@/lib/utils";
import PaginationPage from "../shared/PaginationPage";

export async function ListAnswerCard({
  id,
  filter,
  curPage,
}: {
  id: string;
  filter?: string;
  curPage: number;
}) {
  const { allAnswer, totalPages } = await getAllAnswerById({
    questionId: id,
    sortBy: filter,
  });
  return (
    <>
      <h3 className="primary-text-gradient h3-bold mb-2">
        {allAnswer.length} Answers
      </h3>
      {allAnswer.map((answer) => (
        <AnswerCard
          pageID={id}
          key={getIdToString(answer._id)}
          answer={answer}
        />
      ))}
      <PaginationPage curPage={curPage} totalPages={totalPages} />
    </>
  );
}
