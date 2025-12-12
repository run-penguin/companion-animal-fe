import { useCallback } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

interface KakaoGeocoderResult {
  x: string;
  y: string;
  address_name: string;
  address_type: string;
}

type KakaoGeocoderStatus = "OK" | "ZERO_RESULT" | "ERROR";

export const useGeocoder = () => {
  const addressToCoords = useCallback(
    (address: string): Promise<Coordinates> => {
      return new Promise((resolve, reject) => {
        if (!window.kakao || !window.kakao.maps) {
          reject(new Error("카카오맵이 로드되지 않았습니다."));
          return;
        }

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(
          address,
          (result: KakaoGeocoderResult[], status: KakaoGeocoderStatus) => {
            if (
              status === window.kakao.maps.services.Status.OK &&
              result.length > 0
            ) {
              resolve({
                lat: parseFloat(result[0].y),
                lng: parseFloat(result[0].x),
              });
            } else {
              reject(new Error(`주소 변환 실패: ${address}`));
            }
          }
        );
      });
    },
    []
  );

  return { addressToCoords };
};
