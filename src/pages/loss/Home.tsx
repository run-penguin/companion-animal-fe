import SearchBar from "../../components/loss/search/SearchBar";
import LossList from "../../components/loss/list/LossList";
import NavigationBar from "../../components/loss/pagination/Pagination";
import Button from "../../components/Button";
import { BUTTON_TYPE } from "../../util/constants";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const onClickMap = () => {
    navigate("/map");
  };

  return (
    <>
      <div className="header">
        <div></div>
        <label>분실동물 조회</label>
        <Button
          type={BUTTON_TYPE.MAP.value}
          isText={true}
          onClick={onClickMap}
        />
      </div>
      <SearchBar />
      <NavigationBar />
      <LossList />
      <NavigationBar />
    </>
  );
}
