export type Sido = {
  orgCd: string;
  orgdownNm: string;
};

export type Sigungu = {
  uprCd: string;
  orgCd: string;
  orgdownNm: string;
};

export const kindList = [
  { orgCd: 0, orgdownNm: "전체" },

  {
    orgCd: 417000,
    orgdownNm: "개",
  },
  {
    orgCd: 422400,
    orgdownNm: "고양이",
  },
  {
    orgCd: 4229900,
    orgdownNm: "기타",
  },
];
