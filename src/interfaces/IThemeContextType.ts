import { Dispatch, SetStateAction } from "react";

export interface IThemeContextType {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}
