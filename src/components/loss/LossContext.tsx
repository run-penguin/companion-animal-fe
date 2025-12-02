import { createContext, type ReactNode, useState } from "react";
import api from "../../api/axios";

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
  pageNo: number;
  numOfRows: number;
};

type LossContextType = {
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  lossList: LossPet[];
  searchLossList: (params: SearchParams) => Promise<void>;
};

const LossContext = createContext<LossContextType | null>(null);

export function LossProvider({ children }: { children: ReactNode }) {
  const [lossList, setLossList] = useState<LossPet[]>([]);
  const [numOfRows, setNumOfRows] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const searchLossList = async (params: SearchParams) => {
    const response = await api.getLossList(params);
    const data = response.data;

    setNumOfRows(data.numOfRows);
    setPageNo(data.pageNo);
    setTotalCount(data.totalCount);
    setLossList(data.items.item);
  };

  return (
    <LossContext.Provider
      value={{ numOfRows, pageNo, totalCount, lossList, searchLossList }}
    >
      {children}
    </LossContext.Provider>
  );
}

export default LossContext;
