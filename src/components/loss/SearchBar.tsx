import { useEffect, useState } from "react";

import useAxios from "../../hooks/useAxios";
import api from "../../api/axios";

import Button from "../Button";
import { BUTTON_TYPE } from "../../util/constants.ts";
import "./SearchBar.css";

type Sido = {
  orgCd: string;
  orgdownNm: string;
};

type Sigungu = {
  uprCd: string;
  orgCd: string;
  orgdownNm: string;
};

const kindList = [
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

const SearchBar = () => {
  const [sidoCode, setSidoCode] = useState("");
  const [sigunguCode, setSigunguCode] = useState("");

  const { response: sidoResponse, sendRequest: getSidoList } = useAxios(
    api.getSidoList
  );
  const { response: sigunguResponse, sendRequest: getSigunguList } = useAxios(
    api.getSigunguList
  );

  useEffect(() => {
    getSidoList();
  }, []);

  const onChangeSido = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSido = e.target.value;

    setSidoCode(selectedSido);
    setSigunguCode(""); // 시군구 초기화

    if (selectedSido) {
      await getSigunguList(selectedSido);
    }
  };

  const onChangeSigungu = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSigungu = e.target.value;

    setSigunguCode(selectedSigungu);
  };

  const sidoList: Sido[] = sidoResponse?.data || [];
  const sigunguList: Sigungu[] = sigunguResponse?.data || [];

  return (
    <div className="search-bar">
      <select onChange={onChangeSido} value={sidoCode}>
        <option value="">시/도</option>
        {sidoList?.map((item) => (
          <option key={item.orgCd} value={item.orgCd}>
            {item.orgdownNm}
          </option>
        ))}
      </select>

      <select onChange={onChangeSigungu} value={sigunguCode}>
        <option value="">시/군/구</option>
        {sigunguList?.map((item) => (
          <option key={item.orgCd} value={item.orgCd}>
            {item.orgdownNm}
          </option>
        ))}
      </select>

      <div className="radio-wrap">
        {kindList.map((item) => (
          <label key={item.orgCd}>
            <input type="radio" value={item.orgCd} name="kind" />
            {item.orgdownNm}
          </label>
        ))}
      </div>

      <Button type={BUTTON_TYPE.SEARCH.value} onClick={() => {}} />
    </div>
  );
};

export default SearchBar;
