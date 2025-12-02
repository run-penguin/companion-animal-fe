import { useContext } from "react";
import LossContext from "../LossContext";

export const useLoss = () => {
  const context = useContext(LossContext);
  if (!context) {
    throw new Error("useLoss must be used within LossProvider");
  }
  return context;
};
