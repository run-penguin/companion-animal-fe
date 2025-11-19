import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "X-Requested-With": "XMLHttpRequest" }, // 요청 헤더 설정
  withCredentials: true,
});

const api = {
  getSidoList: () => instance.get("/loss/sido"),
};

export default api;
