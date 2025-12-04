import axios from "axios";

import { API_URL } from "../config/api.ts";

const instance = axios.create({
  baseURL: API_URL + "/api",
  headers: { "X-Requested-With": "XMLHttpRequest" }, // 요청 헤더 설정
  withCredentials: true,
  timeout: 60000,
});

interface LossListParams {
  fromDate: string;
  toDate: string;
  sidoCode?: string;
  sigunguCode?: string;
  selectedKind?: number;
  page?: number;
  size?: number;
}

const api = {
  getSidoList: () => instance.get("/loss/sido"),
  getSigunguList: (sidoCode?: string) =>
    instance.get("/loss/sigungu", {
      params: { upperCode: sidoCode },
    }),
  getLossList: (params: LossListParams) => instance.get("/loss", { params }),
};

export default api;
