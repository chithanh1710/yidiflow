"use client";

import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import { IThemeContextType } from "../interfaces/IThemeContextType";

const ThemeContext = createContext<IThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState("dark");

  useEffect(() => setMode(localStorage.getItem("theme") || "dark"), []);

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (mode === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      const userPrefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const userMode = userPrefersDark ? "dark" : "light";
      setMode(userMode);
    }
  }, [mode]);

  const value = {
    mode,
    setMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}
