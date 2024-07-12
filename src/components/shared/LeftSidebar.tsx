"use client";
import {
  BriefcaseBusinessIcon,
  CircleHelpIcon,
  HomeIcon,
  LogInIcon,
  StarIcon,
  TagsIcon,
  UserCog,
  UserIcon,
  UsersIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { SignedOut } from "@clerk/clerk-react";

interface DataLeftSidebarType {
  icon: ReactNode;
  href: string;
  label: string;
}

const DataLeftSidebar: DataLeftSidebarType[] = [
  {
    icon: <HomeIcon />,
    href: "/",
    label: "Home",
  },
  {
    icon: <UsersRoundIcon />,
    href: "/community",
    label: "Community",
  },
  {
    icon: <StarIcon />,
    href: "/collections",
    label: "Collections",
  },
  {
    icon: <BriefcaseBusinessIcon />,
    href: "/find-jobs",
    label: "Find Jobs",
  },
  {
    icon: <TagsIcon />,
    href: "/tags",
    label: "Tags",
  },
  {
    icon: <UsersIcon />,
    href: "/communities",
    label: "Communities",
  },
  {
    icon: <CircleHelpIcon />,
    href: "/ask-a-question",
    label: "Ask a Question",
  },
];

export default function LeftSidebar() {
  const pathname = usePathname();
  return (
    <section className="group fixed left-0 background-light900_dark200 light-border top-0 h-screen flex flex-col justify-between custom-scrollbar overflow-y-auto border-r md:p-6 p-3 !pt-36 shadow-light-300 dark:shadow-none max-sm:hidden max-md:w-[82px] peer-hover:hidden hover:w-[266px] lg:w-[266px]">
      <div className="flex flex-col h-full gap-2 justify-between">
        <div>
          {DataLeftSidebar.map((item) => (
            <Link
              className={`flex gap-2 p-4 rounded-lg dark:text-light-900 text-black ${
                pathname === item.href
                  ? "primary-gradient font-semibold !text-light-900"
                  : ""
              }`}
              key={item.label}
              href={item.href}
            >
              <span>{item.icon}</span>
              <span className="max-md:hidden group-hover:block">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
        <SignedOut>
          <div className="flex flex-col gap-3">
            <Link href="/sign-in">
              <Button className="flex gap-1 small-medium btn-secondary !text-primary-500 font-semibold min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <span className="md:hidden group-hover:hidden">
                  <UserIcon />
                </span>
                <span className="max-md:hidden group-hover:block">Log In</span>
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="flex gap-1 small-medium light-border-2 text-black dark:text-white font-semibold btn-tertiary min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                <span className="md:hidden group-hover:hidden">
                  <UserCog />
                </span>
                <span className="max-md:hidden group-hover:block">Sign Up</span>
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </section>
  );
}
