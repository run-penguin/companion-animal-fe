import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { BUTTON_TYPE } from "../../util/constants";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import "./LostMap.css";
import { useLost } from "../../components/lost/list/useLost";
import { useEffect, useState } from "react";
import { useGeocoder } from "../../hooks/useGeocoder";

interface LostAnimal {
  callName: string;
  callTel: string;
  happenDt: string;
  happenAddr: string;
  happenPlace: string;
  orgNm: string;
  popfile: string;
  kindCd: string;
  colorCd: string;
  sexCd: string;
  age: string;
  specialMark: string;
  lat?: number; // 변환된 좌표 (optional)
  lng?: number;
}

const LostMap = () => {
  const navigate = useNavigate();

  const onClickList = () => {
    navigate("/");
  };

  const { lostList } = useLost();
  const { addressToCoords } = useGeocoder();
  const [animals, setAnimals] = useState<LostAnimal[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<LostAnimal | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 35.3218, lng: 126.9086 }); // 담양 중심
  const [isConverting, setIsConverting] = useState(true);

  useEffect(() => {
    const convertedAddrs = async () => {
      const convertedAnimals = await Promise.all(
        lostList.map(async (animal) => {
          try {
            const coords = await addressToCoords(animal.happenAddr);
            return {
              ...animal,
              lat: coords.lat,
              lng: coords.lng,
            };
          } catch (error) {
            console.error(`주소 변환 실패: ${animal.happenAddr}`, error);
            return null;
          }
        })
      );

      // 변환 성공한 동물만 필터링
      const validAnimals = convertedAnimals.filter(
        (animal): animal is LostAnimal =>
          animal !== null && animal.lat !== undefined
      );

      setAnimals(validAnimals);

      // 첫 번째 동물 위치로 지도 중심 설정
      if (
        validAnimals.length > 0 &&
        validAnimals[0].lat &&
        validAnimals[0].lng
      ) {
        setMapCenter({ lat: validAnimals[0].lat, lng: validAnimals[0].lng });
      }
    };
  });

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
          <MapMarker position={{ lat: 37.5665, lng: 126.978 }}>
            <div style={{ padding: "5px", color: "#000" }}>여기!</div>
          </MapMarker>
        </Map>
      </div>
    </div>
  );
};

export default LostMap;
