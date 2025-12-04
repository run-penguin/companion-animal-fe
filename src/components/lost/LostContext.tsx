import { createContext, type ReactNode, useState } from "react";
import api from "../../api/axios";

type LostPet = {
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

type LostContextType = {
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  lostList: LostPet[];
  searchLostList: (params: SearchParams) => Promise<void>;
  setPageNo: (pageNo: number) => void;
};

const LostContext = createContext<LostContextType | null>(null);

export function LostProvider({ children }: { children: ReactNode }) {
  const [lostList, setLostList] = useState<LostPet[]>([]);
  const [numOfRows, setNumOfRows] = useState(2);
  const [pageNo, setPageNo] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const searchLostList = async (params: SearchParams) => {
    const response = await api.getLostList(params);
    const data = response.data;

    setNumOfRows(data.numOfRows);
    setPageNo(data.pageNo);
    setTotalCount(data.totalCount);
    setLostList(data.items.item);
  };

  return (
    <LostContext.Provider
      value={{
        lostList,
        searchLostList,
        pageNo,
        setPageNo,
        numOfRows,
        totalCount,
      }}
    >
      {children}
    </LostContext.Provider>
  );
}

export default LostContext;
