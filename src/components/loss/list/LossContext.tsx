import { createContext, type ReactNode, useState } from "react";
import api from "../../../api/axios";

type LossPet = {
  callName: string;
  callTel: string;
  happenDt: string;
  happenAddr: string;
  happenAddrDtl: string;
  happenPlace: string;
  orgNm: string;
  popfile: string;
  kindCd: string;
  colorCd: string;
  sexCd: string;
  age: string;
  specialMark: string;
  rfidCd: string;
};

type SearchParams = {
  fromDate: string;
  toDate: string;
  sidoCode?: string;
  sigunguCode?: string;
  selectedKind?: number;
};

type LossContextType = {
  lossList: LossPet[];
  searchLossList: (params: SearchParams) => Promise<void>;
};

const LossContext = createContext<LossContextType | null>(null);

export function LossProvider({ children }: { children: ReactNode }) {
  const [lossList, setLossList] = useState<LossPet[]>([]);

  const searchLossList = async (params: SearchParams) => {
    const response = await api.getLossList(params);
    setLossList(response.data);
  };

  return (
    <LossContext.Provider value={{ lossList, searchLossList }}>
      {children}
    </LossContext.Provider>
  );
}

export default LossContext;
