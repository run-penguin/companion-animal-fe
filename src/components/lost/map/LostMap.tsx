import { useEffect, useState } from "react";
import type { LostPet } from "../../../types/common";
import { useLost } from "../useLost";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useGeocoder } from "../../../hooks/useGeocoder";
import dayjs from "dayjs";
import DetailModal from "./DetailModal";
import "./LostMap.css";

interface LostAnimalWithCoords extends LostPet {
  id: number;
  lat: number;
  lng: number;
}

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
    const convertedList = async () => {
      if (!lostList || lostList.length === 0) {
        setAnimalList([]); // 비동기화로 setState가 여러번 호출되지 않게 async 함수 안에서 설정
        return;
      }

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

  /**
   * Modal
   */
  const [selectedAnimal, setSelectedAnimal] = useState<LostPet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickMarker = (animal: LostAnimalWithCoords) => {
    console.log("click marker");
    setIsModalOpen(true);
    setSelectedAnimal(animal);
  };

  const onClickClose = () => {
    setIsModalOpen(false);
    setSelectedAnimal(null);
  };

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
              <div
                className="marker-detail"
                style={{ padding: "5px", color: "#000", minWidth: "150px" }}
                onClick={() => onClickMarker(animal)}
              >
                <div className="marker-content">
                  <div>{animal.happenPlace}</div>
                  <div>{animal.kindCd}</div>
                  <div>
                    {animal.happenDt
                      ? dayjs(animal.happenDt).format("YYYY-MM-DD HH:mm")
                      : ""}
                  </div>
                </div>

                <div className="marker-tail"></div>
              </div>
            </MapMarker>
          ))}
        </Map>
      </div>

      <DetailModal
        animal={selectedAnimal}
        isOpen={isModalOpen}
        onClose={onClickClose}
      />
    </div>
  );
};

export default LostMap;
