import { useState, useEffect } from "react";
import { kindList } from "./SearchBar.types";
import useAxios from "../../hooks/useAxios";
import api from "../../api/axios";

export const useSearchBar = () => {
  const [sidoCode, setSidoCode] = useState("");
  const [sigunguCode, setSigunguCode] = useState("");
  const [selectedKind, setSelectedKind] = useState(kindList[0].orgCd);

  const { response: sidoResponse, sendRequest: getSidoList } = useAxios(
    api.getSidoList
  );
  const { response: sigunguResponse, sendRequest: getSigunguList } = useAxios(
    api.getSigunguList
  );

  useEffect(() => {
    getSidoList().then(() => {});
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

  const onChangeKind = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedKind(Number(e.target.value));
  };

  return {
    sidoCode,
    sigunguCode,
    selectedKind,
    sidoList: sidoResponse?.data || [],
    sigunguList: sigunguResponse?.data || [],
    onChangeSido,
    onChangeSigungu,
    onChangeKind,
  };
};
