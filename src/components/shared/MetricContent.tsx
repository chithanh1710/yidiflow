import { cn, formatAndDivideNumber } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function MetricContent({
  value,
  title,
  img,
  alt,
  createAt,
  classNameImg,
  classNameP,
  isPageQuestionId = false,
  author,
}: {
  value?: number;
  title?: string;
  img: string;
  alt: string;
  createAt?: Date;
  classNameImg?: string;
  classNameP?: string;
  isPageQuestionId?: boolean;
  author?: { _id: string; picture: string; name: string; username: string };
}) {
  return author ? (
    <Link className="flex gap-2" href={`/profile/${author._id}`}>
      <Image
        alt={alt}
        src={img}
        width={24}
        height={24}
        className={cn("rounded-full object-cover", classNameImg)}
      />
      <p
        className={cn(
          "text-sm flex text-dark100_light900 gap-1 items-center flex-wrap",
          classNameP
        )}
      >
        {author.name} | {author.username}
        {createAt && (
          <span className="max-sm:hidden flex">
            <Dot />
            asked {formatDistanceToNow(createAt, { addSuffix: true })}
          </span>
        )}
      </p>
    </Link>
  ) : createAt ? (
    <div className="flex gap-1">
      <Image
        className={classNameImg}
        alt={alt}
        src={img}
        width={16}
        height={16}
      />
      <p> asked {formatDistanceToNow(createAt, { addSuffix: true })}</p>
    </div>
  ) : (
    <div className="flex gap-1">
      <Image
        className={classNameImg}
        alt={alt}
        src={img}
        width={16}
        height={16}
      />
      {title && (
        <p className={classNameP}>
          <span>{formatAndDivideNumber(value || 0)}</span>{" "}
          {!isPageQuestionId && title}
        </p>
      )}
    </div>
  );
}
