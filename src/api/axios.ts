import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://companion-animal-be.onrender.com:8080",
  headers: { "X-Requested-With": "XMLHttpRequest" }, // 요청 헤더 설정
  withCredentials: true,
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
