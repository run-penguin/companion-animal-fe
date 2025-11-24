import { useState } from "react";
import { AxiosError, type AxiosResponse } from "axios";
import { useLoading } from "../components/useLoading";

type RequestFn<T> = (params?: T) => Promise<AxiosResponse>;

const useAxios = <T = void>(requestFn: RequestFn<T>) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();

  const { setLoading } = useLoading();

  const sendRequest = async (params?: T) => {
    setResponse(undefined);
    setError(undefined);
    setLoading(true);

    try {
      const res = await requestFn(params);
      setResponse(res);
      return res;
    } catch (error) {
      setError(error as AxiosError);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { response, error, sendRequest };
};

export default useAxios;
