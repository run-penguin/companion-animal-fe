import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import SearchBar from "../../components/lost/search/SearchBar";
import { LostProvider } from "../../components/lost/LostContext";
import { BUTTON_TYPE } from "../../util/constants";
import LostMap from "../../components/lost/map/LostMap";
import MainHeader from "../../components/Header";
import "./Map.css";

export default function Map() {
  const navigate = useNavigate();

  const onClickList = () => {
    navigate("/lost/list");
  };

  return (
    <>
      <MainHeader />
      <div className="lost-map-wrap">
        <LostProvider numOfRows={1000}>
          <div className="header">
            <div></div>
            <label>분실동물 조회</label>
            <Button
              type={BUTTON_TYPE.LIST.value}
              isText={true}
              onClick={onClickList}
            />
          </div>

          <SearchBar isInitSearch={false} />

          <LostMap />
        </LostProvider>
      </div>
    </>
  );
}
