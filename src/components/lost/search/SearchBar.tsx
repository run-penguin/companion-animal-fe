import Button from "../../Button.tsx";
import { BUTTON_TYPE } from "../../../util/constants.ts";
import { useSearchBar } from "./useSearchBar.ts";
import { kindList, type Sido, type Sigungu } from "./SearchBar.types.ts";
import "./SearchBar.css";

type SearchBarProps = {
  isInitSearch?: boolean; // 첫 로딩 시 자동 조회 여부
};

const SearchBar = ({ isInitSearch = true }: SearchBarProps) => {
  const {
    sidoCode,
    sigunguCode,
    selectedKind,
    fromDate,
    toDate,
    sidoList,
    sigunguList,
    onChangeSido,
    onChangeSigungu,
    onChangeKind,
    onChangeFromDate,
    onChangeToDate,
    onClickSearch,
  } = useSearchBar(isInitSearch);

  return (
    <div className="search-bar">
      <div className="row">
        <div className="select-group find-region">
          <select onChange={onChangeSido} value={sidoCode}>
            <option value="">시/도 전체</option>
            {sidoList?.map((item: Sido) => (
              <option key={item.orgCd} value={item.orgCd}>
                {item.orgdownNm}
              </option>
            ))}
          </select>

          <select onChange={onChangeSigungu} value={sigunguCode}>
            <option value="">시/군/구 전체</option>
            {sigunguList?.map((item: Sigungu) => (
              <option key={item.orgCd} value={item.orgCd}>
                {item.orgdownNm}
              </option>
            ))}
          </select>
        </div>

        <div className="find-date">
          <div className="date-group">
            <input type="date" value={fromDate} onChange={onChangeFromDate} />
            <span>~</span>
            <input type="date" value={toDate} onChange={onChangeToDate} />
          </div>
          <Button
            type={BUTTON_TYPE.SEARCH.value}
            isText={true}
            onClick={onClickSearch}
          />
        </div>
      </div>

      <div className="radio-wrap filter-bar">
        {kindList.map((item) => (
          <label
            key={item.orgCd}
            className={selectedKind === item.orgCd ? "active" : ""}
          >
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
    </div>
  );
};

export default SearchBar;
