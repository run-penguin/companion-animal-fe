import { useLost } from "./useLost";
import "./LostList.css";
import dayjs from "dayjs";

const LostList = () => {
  const { lostList } = useLost();

  if (Array.isArray(lostList)) {
    return (
      <div className="lost-list">
        {lostList.map((pet, idx) => (
          <div key={idx} className="lost-pet">
            <div className="img-wrap">
              <img
                src={pet.popfile.replace("http://", "https://")}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src = "/no-img-text.png";
                }}
              />
            </div>

            <div className="lost-info">
              <div>접수일</div>
              <div className="span-3">
                {dayjs(pet.happenDt).format("YYYY-MM-DD HH:mm")}
              </div>

              <div>신고자 성명</div>
              <div>{pet.callName}</div>

              <div>신고자 연락처</div>
              <div>{pet.callTel}</div>

              <div>분실장소</div>
              <div className="span-3">{pet.happenAddr}</div>

              <div>분실장소 상세</div>
              <div className="span-3">{pet.happenAddrDtl}</div>

              <div>주위 건물</div>
              <div className="span-3">{pet.happenPlace}</div>

              <div>관할지</div>
              <div className="span-3">{pet.orgNm}</div>

              <div>품종</div>
              <div>{pet.kindCd}</div>

              <div>색상</div>
              <div>{pet.colorCd}</div>

              <div>성별</div>
              <div>{pet.sexCd === "M" ? "수컷" : "암컷"}</div>

              <div>나이</div>
              <div>{pet.age}</div>

              <div>특징</div>
              <div className="span-3">{pet.specialMark}</div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="no-list">
        <label>조회된 분실동물이 없습니다.</label>
      </div>
    );
  }
};

export default LostList;
