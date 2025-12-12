import { useEffect, useState } from "react";
import type { LostPet } from "../../../types/common";
import { useLost } from "../useLost";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useGeocoder } from "../../../hooks/useGeocoder";
import dayjs from "dayjs";

interface LostAnimalWithCoords extends LostPet {
  id: number;
  lat: number;
  lng: number;
}

/** todo
 * 조회 결과가 없는 지역에 Marker clear 필요함
 * 날짜 포맷 적절히 변경 필요
 * 자세히 버튼을 추가 -> 자세히를 누르면 큰 화면으로 볼 수 있도록 Modal 추가하면 좋을 듯
 * 디자인 개선
 * 부산으로 조회 -> 부산으로 자동 이동 (각 위치를 수동으로 정해줘야할까?)
 * 목록 조회 후 내 위치와 상관없이 이동함 (처음부터 자동 조회하지 말고 직접 검색 클릭 후 Marker 기준으로 이동한다면?)
 */

const LostMap = () => {
  const { lostList } = useLost();
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 });

  // 1. 마운트된 후
  useEffect(() => {
    // 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  // 2. 리스트가 업데이트 됐을 때
  const { addressToCoords } = useGeocoder();
  const [animalList, setAnimalList] = useState<LostAnimalWithCoords[]>([]);

  useEffect(() => {
    if (!lostList || lostList.length === 0) return;

    const convertedList = async () => {
      const addPositionList = await Promise.all(
        lostList.map(async (animal, idx) => {
          const coords = await addressToCoords(animal.happenAddr);
          return {
            ...animal,
            lat: coords?.lat,
            lng: coords?.lng,
            id: idx,
          };
        })
      );

      const validPositionList = addPositionList.filter(
        (animal) =>
          typeof animal.lat === "number" && typeof animal.lng === "number"
      );

      setAnimalList(validPositionList);
    };

    convertedList();
  }, [lostList, addressToCoords]);

  return (
    <div className="container">
      <div className="map-container">
        <Map
          center={mapCenter}
          className="kakao-map"
          level={8}
          isPanto={false}
          disableDoubleClickZoom={false}
        >
          {animalList.map((animal) => (
            <MapMarker
              key={animal.id}
              position={{ lat: animal.lat, lng: animal.lng }}
            >
              <div style={{ padding: "5px", color: "#000", minWidth: "150px" }}>
                <div>
                  <strong>{animal.kindCd}</strong>
                </div>
                <div>{animal.happenPlace}</div>
                <div style={{ fontSize: "12px" }}>
                  {animal.happenDt
                    ? dayjs(animal.happenDt).format("YYYY-MM-DD HH:mm")
                    : ""}
                </div>
              </div>
            </MapMarker>
          ))}
        </Map>
      </div>
    </div>
  );
};

export default LostMap;
