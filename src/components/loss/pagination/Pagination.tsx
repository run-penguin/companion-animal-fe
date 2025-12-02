import { useLoss } from "../list/useLoss";
import "./Pagination.css";

const NavigationBar = () => {
  const { pageNo, setPageNo, numOfRows, totalCount } = useLoss();

  const totalPage = Math.ceil(totalCount / numOfRows);

  const onClickPrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };
  const onClickNext = () => {
    console.log(totalCount, pageNo, totalCount > pageNo);

    if (totalPage > pageNo) {
      setPageNo(pageNo + 1);
    }
  };

  return (
    <div className="nav-bar">
      <div className="btn-wrap">
        <button type="button" className="prev" onClick={onClickPrev}></button>
      </div>

      <div className="page">
        {pageNo} / {totalPage}
      </div>

      <div className="btn-wrap">
        <button type="button" className="next" onClick={onClickNext}></button>
      </div>
    </div>
  );
};

export default NavigationBar;
