import React, { useState, useEffect } from "react";
import { kindList } from "./SearchBar.types";
import useAxios from "../../../hooks/useAxios";
import api from "../../../api/axios";
import Swal from "sweetalert2";
import "../../../assets/Swal.css";
import dayjs from "dayjs";
import {
  commonRules,
  validateFields,
  type ValidationRule,
} from "../../../util/validation";
import { useLoss } from "../list/useLoss";

export const useSearchBar = () => {
  const [sidoCode, setSidoCode] = useState("");
  const [sigunguCode, setSigunguCode] = useState("");
  const [selectedKind, setSelectedKind] = useState(kindList[0].orgCd);
  const [fromDate, setFromDate] = useState(
    dayjs().add(-1, "month").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(dayjs().format("YYYY-MM-DD"));

  // 검색용 함수
  const { searchLossList } = useLoss();

  /**
   * API - request, response
   */
  const { response: sidoResponse, sendRequest: getSidoList } = useAxios(
    api.getSidoList
  );
  const { response: sigunguResponse, sendRequest: getSigunguList } = useAxios(
    api.getSigunguList
  );
  // const { response: lossResponse, sendRequest: getLossList } = useAxios(
  //   api.getLossList
  // );

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

  const onChangeFromDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
  };

  const onChangeToDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
  };

  const getList = async () => {
    const validation = validateFields({ fromDate, toDate }, validationRules);

    const { isValid, errors } = validation;

    if (!isValid) {
      if (errors) {
        console.log(errors);

        Swal.fire({
          // title: "검색",
          text: errors[Object.keys(errors)[0]],
          icon: "info",
        });
      }
      return;
    }

    searchLossList({
      fromDate: dayjs(fromDate).format("YYYYMMDD"),
      toDate: dayjs(toDate).format("YYYYMMDD"),
      sidoCode,
      sigunguCode,
      selectedKind,
    });
  };

  const onClickSearch = async () => {
    await getList();
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
    // sidoCode: commonRules.required("시/도를 선택해주세요."),
    // sigunguCode: commonRules.required("시/군/구를 선택해주세요."),
    // selectedKind: commonRules.required("동물 종류를 선택해주세요."),
    fromDate: commonRules.required("분실일자를 선택해주세요"),
    toDate: commonRules.required("분실일자를 선택해주세요"),
  };

  /**
   * Mounted
   */
  useEffect(() => {
    const initialize = async () => {
      await getSidoList();
      await getList();
    };

    initialize();
  }, []);

  return {
    sidoCode,
    sigunguCode,
    selectedKind,
    fromDate,
    toDate,
    sidoList: sidoResponse?.data || [],
    sigunguList: sigunguResponse?.data || [],
    onChangeSido,
    onChangeSigungu,
    onChangeKind,
    onChangeFromDate,
    onChangeToDate,
    onClickSearch,
  };
};
