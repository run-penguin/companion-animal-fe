import axios from "axios";

import { API_URL } from "../config/api.ts";

const instance = axios.create({
  baseURL: API_URL + "/api",
  headers: { "X-Requested-With": "XMLHttpRequest" }, // 요청 헤더 설정
  withCredentials: true,
  timeout: 60000,
});

interface LostListParams {
  fromDate: string;
  toDate: string;
  sidoCode?: string;
  sigunguCode?: string;
  selectedKind?: number;
  page?: number;
  size?: number;
}

const api = {
  getSidoList: () => instance.get("/lost/sido"),
  getSigunguList: (sidoCode?: string) =>
    instance.get("/lost/sigungu", {
      params: { upperCode: sidoCode },
    }),
  getLostList: (params: LostListParams) => instance.get("/lost", { params }),
};

export default api;
