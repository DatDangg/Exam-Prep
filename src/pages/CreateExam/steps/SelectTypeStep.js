import React from "react";
import styles from "../CreateExam.module.css";
import multiple from "../../../assets/img/multiple.webp";
import boolean from "../../../assets/img/boolean.webp";
import text from "../../../assets/img/text.svg";

function SelectTypeStep({ questionType, onChange }) {
  return (
    <div className="row">
      <div className="col-md-1 d-flex justify-content-end">
        <div className={styles.titleCount}>1</div>
      </div>
      <div className="col-md-11 mb-3">
        <div className={styles.titleName}>Lựa chọn loại đề</div>
        <div className={styles.titleDesc}>Chọn loại đề tương ứng với phần bạn làm</div>
        <div className={styles.partContent}>
          <div className={styles.choice}>
            {[{
              key: "Part_1",
              img: multiple,
              label: "Chọn đáp án"
            }, {
              key: "Part_2",
              img: boolean,
              label: "Đúng sai"
            }, {
              key: "Part_3",
              img: text,
              label: "Câu trả lời"
            }].map(({ key, img, label }) => (
              <div
                key={key}
                className={
                  questionType === key
                    ? `${styles.active} ${styles.choiceItem}`
                    : styles.choiceItem
                }
                onClick={() => onChange(key)}
              >
                <img src={img} className={styles.choiceImg} alt={label} />
                <span className={styles.choiceName}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectTypeStep;