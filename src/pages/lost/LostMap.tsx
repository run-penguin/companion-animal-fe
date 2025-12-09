import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import Button from "../../components/Button";
import { useLost } from "../../components/lost/list/useLost";
import { BUTTON_TYPE } from "../../util/constants";
import { useGeocoder } from "../../hooks/useGeocoder";
import type { LostPet } from "../../types/common";

import "./LostMap.css";

import dayjs from "dayjs";

interface LostAnimalWithCoords extends LostPet {
  id: number;
  lat: number;
  lng: number;
}

const LostMap = () => {
  const navigate = useNavigate();

  const onClickList = () => {
    navigate("/");
  };

  // 목록
  const { searchLostList, lostList } = useLost();

  // 1. 마운트된 후
  useEffect(() => {
    const fromDate = dayjs().add(-1, "month").format("YYYY-MM-DD");
    const toDate = dayjs().format("YYYY-MM-DD");

    // 검색 후 lostList에 담아줌
    searchLostList({
      fromDate: dayjs(fromDate).format("YYYYMMDD"),
      toDate: dayjs(toDate).format("YYYYMMDD"),
      pageNo: 1,
      numOfRows: 1000,
    });
  }, []);

  // 2. 리스트가 업데이트 됐을 때
  const { addressToCoords } = useGeocoder();
  const [animalList, setAnimalList] = useState<LostAnimalWithCoords[]>([]);

  useEffect(() => {
    if (lostList.length === 0) return;

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
    <div>
      <div className="header">
        <div></div>
        <label>분실동물 조회</label>
        <Button
          type={BUTTON_TYPE.LIST.value}
          isText={true}
          onClick={onClickList}
        />
      </div>

      <div className="map-container">
        <Map
          center={{ lat: 37.5665, lng: 126.978 }} // 서울 시청
          style={{ width: "100%", height: "500px" }}
          level={3}
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
                <div style={{ fontSize: "12px" }}>{animal.happenDt}</div>
              </div>
            </MapMarker>
          ))}
        </Map>
      </div>
    </div>
  );
};

export default LostMap;
