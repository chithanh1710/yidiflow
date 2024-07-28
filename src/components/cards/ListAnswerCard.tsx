import AnswerCard from "@/components/cards/AnswerCard";
import { getAllAnswerById } from "@/lib/actions/answer.action";
import { getIdToString } from "@/lib/utils";

export async function ListAnswerCard({
  id,
  filter,
}: {
  id: string;
  filter?: string;
}) {
  const dataAnswer = await getAllAnswerById({
    questionId: id,
    sortBy: filter,
  });
  return (
    <>
      <h3 className="primary-text-gradient h3-bold mb-2">
        {dataAnswer.length} Answers
      </h3>
      {dataAnswer.map((answer) => (
        <AnswerCard
          pageID={id}
          key={getIdToString(answer._id)}
          answer={answer}
        />
      ))}
    </>
  );
}
