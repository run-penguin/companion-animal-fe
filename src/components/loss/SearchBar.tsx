import Button from "../Button";
import { BUTTON_TYPE } from "../../util/constants.ts";
import { useSearchBar } from "./useSearchBar.ts";
import { kindList, type Sido, type Sigungu } from "./SearchBar.types.ts";

import "./SearchBar.css";

const SearchBar = () => {
  const {
    sidoCode,
    sigunguCode,
    selectedKind,
    sidoList,
    sigunguList,
    onChangeSido,
    onChangeSigungu,
    onChangeKind,
    onClickSearch,
  } = useSearchBar();

  return (
    <div className="search-bar">
      <div className="select-wrapper">
        <select onChange={onChangeSido} value={sidoCode}>
          <option value="">시/도</option>
          {sidoList?.map((item: Sido) => (
            <option key={item.orgCd} value={item.orgCd}>
              {item.orgdownNm}
            </option>
          ))}
        </select>

        <select onChange={onChangeSigungu} value={sigunguCode}>
          <option value="">시/군/구</option>
          {sigunguList?.map((item: Sigungu) => (
            <option key={item.orgCd} value={item.orgCd}>
              {item.orgdownNm}
            </option>
          ))}
        </select>
      </div>

      <div className="radio-wrap">
        {kindList.map((item) => (
          <label key={item.orgCd}>
            <input
              type="radio"
              value={item.orgCd}
              name="kind"
              checked={selectedKind === item.orgCd}
              onChange={onChangeKind}
            />
            {item.orgdownNm}
          </label>
        ))}
      </div>

      <Button
        type={BUTTON_TYPE.SEARCH.value}
        isText={true}
        onClick={onClickSearch}
      />
    </div>
  );
};

export default SearchBar;
