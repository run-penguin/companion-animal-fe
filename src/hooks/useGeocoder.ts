import { useState, useCallback } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

export const useGeocoder = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addressToCoords = useCallback(
    (address: string): Promise<Coordinates> => {
      return new Promise((resolve, reject) => {
        if (!window.kakao || !window.kakao.maps) {
          reject(new Error("카카오맵이 로드되지 않았습니다."));
          return;
        }

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            resolve({
              lat: parseFloat(result[0].y),
              lng: parseFloat(result[0].x),
            });
          } else {
            reject(new Error(`주소 변환 실패: ${address}`));
          }
        });
      });
    },
    []
  );

  return { addressToCoords, isLoading };
};
