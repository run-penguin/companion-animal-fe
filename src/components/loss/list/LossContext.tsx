import { createContext, type ReactNode, useState } from "react";
import api from "../../../api/axios";

type LossPet = {
  desertionNo: string; // 유기번호
  filename: string; // 썸네일 이미지
  happenDt: string; // 접수일
  happenPlace: string; // 발견장소
  kindCd: string; // 품종
  colorCd: string; // 색상
  age: string; // 나이
  weight: string; // 체중
  noticeNo: string; // 공고번호
  noticeSdt: string; // 공고시작일
  noticeEdt: string; // 공고종료일
  popfile: string; // 이미지
  processState: string; // 상태
  sexCd: string; // 성별
  neuterYn: string; // 중성화여부
  specialMark: string; // 특징
  careNm: string; // 보호소이름
  careTel: string; // 보호소전화번호
  careAddr: string; // 보호장소
  orgNm: string; // 관할기관
  chargeNm: string; // 담당자
  officeTel: string; // 담당자연락처
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
