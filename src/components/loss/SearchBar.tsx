import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import api from "../../api/axios";

type Sido = {
  orgCd: string;
  orgdownNm: string;
};

const SearchBar = () => {
  const { response, sendRequest } = useAxios(api.getSidoList);
  //   const [sidoLisst, setSidoList] = useState<Sido[]>([]);

  // 마운트 시 API 요청
  useEffect(() => {
    sendRequest();
  }, []); // 빈 배열 = 마운트시 한 번만 실행

  const sidoList: Sido[] = response?.data || [];

  return (
    <div>
      <select>
        <option value="">시/도</option>
        {sidoList?.map((sido) => (
          <option key={sido.orgCd} value={sido.orgCd}>
            {sido.orgdownNm}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
