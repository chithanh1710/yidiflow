import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <main>
      Navbar
      <div>
        LeftSideBar
        <section>{children}</section>
        RightSideBar
      </div>
    </main>
  );
}
