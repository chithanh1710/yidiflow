"use server";
export async function handleVoteOrSave(formData: FormData) {
  const data = formData.get("typeAction") as string;
  const { name, value } = JSON.parse(data);

  switch (name) {
    case "upVote":
      if (value) {
      } else {
      }
      console.log(value);
      break;
    case "downVote":
      if (value) {
      } else {
      }
      console.log(value);
      break;
    case "save":
      if (value) {
      } else {
      }
      console.log(value);
      break;
    default:
      break;
  }
}
