import React, { useState, useEffect } from "react";
import { kindList } from "./SearchBar.types";
import useAxios from "../../hooks/useAxios";
import api from "../../api/axios";
import Swal from "sweetalert2";
import "../../assets/Swal.css";
import {
  commonRules,
  validateField,
  validateFields,
  type ValidationRule,
} from "../../util/validation";

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

  /**
   * Mounted
   */
  useEffect(() => {
    getSidoList().then(() => {});
  }, []);

  /**
   * Events
   */
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

  const onClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    const validation = validateFields(
      { sidoCode, sigunguCode, selectedKind },
      validationRules
    );

    const { isValid, errors } = validation;

    if (!isValid) {
      if (errors) {
        console.log(errors);

        Swal.fire({
          // title: "검색",
          text: errors[Object.keys(errors)[0]],
        });
      }
    }
  };

  /**
   * Validation
   */
  const validationRules: Record<string, ValidationRule> = {
    // sideCode: {
    //   required: true,
    //   message: "시/도를 선택해주세요.",
    // },
    // sigunguCode: {
    //   required: true,
    //   message: "시/군/구를 선택해주세요.",
    // },
    sidoCode: commonRules.required("시/도를 선택해주세요."),
    sigunguCode: commonRules.required("시/군/구를 선택해주세요."),
    selectedKind: commonRules.required("동물 종류를 선택해주세요."),
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
    onClickSearch,
  };
};
