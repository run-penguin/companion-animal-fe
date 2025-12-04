import SearchBar from "../../components/lost/search/SearchBar";
import LostList from "../../components/lost/list/LostList";
import NavigationBar from "../../components/lost/pagination/Pagination";
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
      <LostList />
      <NavigationBar />
    </>
  );
}
