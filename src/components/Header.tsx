import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const onClickLost = () => {
    navigate("/lost/list");
  };

  const onClickRescue = () => {
    navigate("/rescue/list");
  };

  return (
    <div className="main-header">
      <div onClick={onClickLost}>분실</div>
      <div onClick={onClickRescue}>구조</div>
    </div>
  );
};

export default Header;
