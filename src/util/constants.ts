export const BUTTON_TYPE = {
  SEARCH: {
    value: "SEARCH",
    text: "검색",
    className: "search",
  },
  MAP: {
    value: "MAP",
    text: "지도",
    className: "map",
  },
} as const;

export type ButtonTypeValue =
  (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE]["value"];
