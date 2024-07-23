"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { SignedOut } from "@clerk/clerk-react";
import Image from "next/image";
import { useMenu } from "./ToggleMenu";

interface DataLeftSidebarType {
  icon: string;
  href: string;
  label: string;
}

const DataLeftSidebar: DataLeftSidebarType[] = [
  {
    icon: "assets/icons/home.svg",
    href: "/",
    label: "Home",
  },
  {
    icon: "assets/icons/users.svg",
    href: "/community",
    label: "Community",
  },
  {
    icon: "assets/icons/star.svg",
    href: "/collections",
    label: "Collections",
  },
  {
    icon: "assets/icons/suitcase.svg",
    href: "/find-jobs",
    label: "Find Jobs",
  },
  {
    icon: "assets/icons/tag.svg",
    href: "/tags",
    label: "Tags",
  },
  {
    icon: "assets/icons/user.svg",
    href: "/communities",
    label: "Communities",
  },
  {
    icon: "assets/icons/question.svg",
    href: "/ask-question",
    label: "Ask a Question",
  },
];

export default function LeftSidebar() {
  const pathname = usePathname();
  const { isOpenMenu, setIsOpenMenu } = useMenu();
  return (
    <section
      className={`z-50 flex-shrink-0 sticky left-0 top-0 background-light900_dark200 transition-all duration-700 light-border h-screen flex flex-col justify-between custom-scrollbar overflow-y-auto border-r md:p-6 p-3 !pt-36 shadow-light-300 dark:shadow-none max-sm:w-[160px] max-sm:fixed ${
        isOpenMenu
          ? "max-sm:translate-x-0 max-sm:!w-full"
          : "max-sm:-translate-x-full"
      } max-md:w-[82px] lg:w-[266px]`}
    >
      <div className="flex flex-col h-full gap-2 justify-between">
        <div>
          {DataLeftSidebar.map((item) => (
            <Link
              className={`flex items-center gap-5 p-4 rounded-lg dark:text-light-900 text-black ${
                pathname === item.href
                  ? "primary-gradient font-semibold !text-light-900"
                  : ""
              }`}
              onClick={() => setIsOpenMenu(false)}
              key={item.label}
              href={item.href}
            >
              <Image
                alt={`${item.label} icon`}
                src={item.icon}
                width={26}
                height={26}
                className={`${pathname === item.href ? "" : "invert-colors"}`}
              />
              <p className={`max-md:hidden ${isOpenMenu && "max-sm:block"}`}>
                {item.label}
              </p>
            </Link>
          ))}
        </div>
        <SignedOut>
          <div className="flex flex-col gap-3">
            <Link href="/sign-in">
              <Button className="flex gap-1 small-medium btn-secondary !text-primary-500 font-semibold min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <span className="md:hidden">
                  <Image
                    alt={`user icon`}
                    src="/assets/icons/account.svg"
                    width={26}
                    height={26}
                    className="invert-colors"
                  />
                </span>
                <span
                  className={`max-md:hidden ${isOpenMenu && "max-sm:block"}`}
                >
                  Log In
                </span>
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="flex gap-1 small-medium light-border-2 text-black dark:text-white font-semibold btn-tertiary min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                <span className="md:hidden">
                  <Image
                    alt={`user icon`}
                    src="/assets/icons/sign-up.svg"
                    width={26}
                    height={26}
                    className="invert-colors"
                  />
                </span>
                <span className="max-md:hidden">Sign Up</span>
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </section>
  );
}
