import { useEffect } from "react";
import type { LostPet } from "../../../types/common";
import "./DetailModal.css";
import dayjs from "dayjs";

interface DetailModalProps {
  animal: LostPet | null;
  isOpen: boolean;
  onClose: () => void;
}

const DetailModal = ({ animal, isOpen, onClose }: DetailModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // 배경 스크롤 방지
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !animal) return null;

  // 배경 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-header">
          <h2>분실 동물 상세 정보</h2>
        </div>

        <div className="modal-body">
          {animal.popfile && (
            <div className="animal-image">
              <img src={animal.popfile} alt={animal.kindCd} />
            </div>
          )}

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">품종</span>
              <span className="info-value">{animal.kindCd || "-"}</span>
            </div>

            <div className="info-item">
              <span className="info-label">색상</span>
              <span className="info-value">{animal.colorCd || "-"}</span>
            </div>

            <div className="info-item">
              <span className="info-label">성별</span>
              <span className="info-value">
                {animal.sexCd === "M"
                  ? "수컷"
                  : animal.sexCd === "F"
                  ? "암컷"
                  : "미상"}
              </span>
            </div>

            <div className="info-item">
              <span className="info-label">나이</span>
              <span className="info-value">{animal.age || "-"}</span>
            </div>

            <div className="info-item">
              <span className="info-label">주위 건물</span>
              <span className="info-value">{animal.happenPlace || "-"}</span>
            </div>

            <div className="info-item">
              <span className="info-label">접수일</span>
              <span className="info-value">
                {animal.happenDt
                  ? dayjs(animal.happenDt).format("YYYY년 MM월 DD일 HH:mm")
                  : "-"}
              </span>
            </div>

            <div className="info-item">
              <span className="info-label">분실 주소</span>
              <span className="info-value">{animal.happenAddr || "-"}</span>
            </div>

            <div className="info-item">
              <span className="info-label">분실 주소 상세</span>
              <span className="info-value">{animal.happenAddrDtl || "-"}</span>
            </div>

            <div className="info-item full-width">
              <span className="info-label">특징</span>
              <span className="info-value">{animal.specialMark || "-"}</span>
            </div>

            <div className="info-item">
              <span className="info-label">관할지</span>
              <span className="info-value">{animal.orgNm || "-"}</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-close" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
