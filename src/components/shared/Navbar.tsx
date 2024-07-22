import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import { Search } from "./Search";

export default function Navbar() {
  return (
    <div className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex flex-shrink-0 items-center gap-1">
        <Image
          width={23}
          height={23}
          alt="YiDiFlow"
          src="/assets/images/site-logo.svg"
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          YiDi <span className="text-primary-500">OverFlow</span>
        </p>
      </Link>
      <Search
        route="global"
        className="max-w-xl max-lg:hidden"
        placeholder="Search anything globally..."
      />
      <div className="flex flex-shrink-0 items-center gap-4 text-dark-100 dark:text-light-900">
        <Theme />
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
}
