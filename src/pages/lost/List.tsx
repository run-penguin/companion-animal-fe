import SearchBar from "../../components/lost/search/SearchBar";
import LostList from "../../components/lost/list/LostList";
import NavigationBar from "../../components/lost/pagination/Pagination";
import Button from "../../components/Button";
import { BUTTON_TYPE } from "../../util/constants";
import { useNavigate } from "react-router-dom";
import "./List.css";
import { LostProvider } from "../../components/lost/LostContext";

const List = () => {
  const navigate = useNavigate();

  const onClickMap = () => {
    navigate("/lost/map");
  };

  return (
    <>
      <LostProvider numOfRows={2}>
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
      </LostProvider>
    </>
  );
};

export default List;
