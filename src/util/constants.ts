export const BUTTON_TYPE = {
  SEARCH: {
    value: "SEARCH",
    text: "검색",
    className: "search",
  },
} as const;

export type ButtonTypeValue =
  (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE]["value"];
