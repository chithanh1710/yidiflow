"use client";
import { Menu, X } from "lucide-react";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface MenuContextProps {
  isOpenMenu: boolean;
  setIsOpenMenu: Dispatch<SetStateAction<boolean>>;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const value = { isOpenMenu, setIsOpenMenu };
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within a ThemeProvider");
  return context;
}

export function ToggleMenu() {
  const { setIsOpenMenu, isOpenMenu } = useMenu();
  return isOpenMenu ? (
    <X
      onClick={() => setIsOpenMenu((prev) => !prev)}
      className="cursor-pointer sm:hidden h-8 w-8"
    />
  ) : (
    <Menu
      onClick={() => setIsOpenMenu((prev) => !prev)}
      className="cursor-pointer sm:hidden h-8 w-8"
    />
  );
}
