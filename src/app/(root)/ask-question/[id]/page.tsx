import { ParamsProps } from "@/types";

export default function page({ params }: ParamsProps) {
  const { id } = params;
  return <div>{id}</div>;
}
