import { useState } from "react";
import { AxiosError, type AxiosResponse } from "axios";

type RequestFn<T> = (params?: T) => Promise<AxiosResponse>;

const useAxios = <T = void>(requestFn: RequestFn<T>, params?: T) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async () => {
    setResponse(undefined);
    setError(undefined);
    setIsLoading(true);

    try {
      const res = await requestFn(params);
      setResponse(res);
    } catch (error) {
      setError(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  return { response, error, isLoading, sendRequest };
};

export default useAxios;
