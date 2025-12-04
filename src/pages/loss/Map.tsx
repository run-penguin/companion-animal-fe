import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { BUTTON_TYPE } from "../../util/constants";

const Map = () => {
  const navigate = useNavigate();

  const onClickList = () => {
    navigate("/");
  };

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
    </div>
  );
};

export default Map;
