import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const onClickLost = () => {
    navigate("/lost/list");
  };

  const onClickRescue = () => {
    navigate("/rescue/list");
  };

  return (
    <div className="home-wrap">
      <div onClick={onClickLost}>분실 동물 조회</div>
      <div onClick={onClickRescue}>구조 동물 조회</div>
    </div>
  );
};

export default Home;
