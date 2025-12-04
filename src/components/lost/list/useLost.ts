import { useContext } from "react";
import LostContext from "../LostContext";

export const useLost = () => {
  const context = useContext(LostContext);
  if (!context) {
    throw new Error("useLost must be used within LostProvider");
  }
  return context;
};
