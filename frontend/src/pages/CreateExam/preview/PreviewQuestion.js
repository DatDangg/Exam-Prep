import React from "react";
import styles from "../CreateExam.module.css";
import QuestionPreviewCard from "./QuestionPreviewCard";

function PreviewQuestion({ questions, onDelete, type }) {
  if (questions.length === 0) return null;
  const index = questions.length - 1;

  return (
    <div className="row">
      <div className="col-md-1 d-flex justify-content-end">
        <div className={styles.titleCount}>{type === "Part_2" ? 4 : 5}</div>
      </div>
      <div className="col-md-11 mb-3">
        <div className={styles.titleName}>Xem lại câu hỏi</div>
        <div className={styles.titleDesc}>Xem lại câu hỏi bạn vừa mới nhập</div>
        <div className={styles.partContent}>
          <QuestionPreviewCard
            key={index}
            index={index}
            question={questions[index]}
            onDelete={() => onDelete(index)}
          />
        </div>
      </div>
    </div>
  );
}

export default PreviewQuestion;
