"use client";
import {
  BriefcaseBusinessIcon,
  CircleHelpIcon,
  HomeIcon,
  LogInIcon,
  StarIcon,
  TagsIcon,
  UsersIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "../ui/button";

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
    <div className="fixed md:w-60 w-20 h-screen pt-[88px] max-sm:hidden">
      <div className="flex flex-col h-full py-10 justify-between gap-2 md:w-[90%] w-[70%] mx-auto">
        <div>
          {DataLeftSidebar.map((item) => (
            <Link
              className={`flex gap-2 p-4 rounded  ${
                pathname === item.href ? "bg-primary-500 font-semibold" : ""
              }`}
              key={item.label}
              href={item.href}
            >
              <span>{item.icon}</span>
              <span className="max-md:hidden">{item.label}</span>
            </Link>
          ))}
        </div>
        {/* <div className="flex flex-col gap-2">
          <Link href="/sign-in">
            <span>
              <LogInIcon />
            </span>
            <span className="max-md:hidden">Login</span>
          </Link>
          <Link href="/sign-up">
            <span></span>
            <span className="max-md:hidden">Sign Up</span>
          </Link>
        </div> */}
      </div>
    </div>
  );
}
