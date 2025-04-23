import React from "react";
import LatexPreview from "./LatexPreview";

import styles from './QuestionPreviewCard.module.css'

function QuestionPreviewCard({ question, onDelete, onUpdate, state = "" }) {
  return (
    <div className={styles.preview}>
      {state !== "update" &&
        <div className={styles.question}>
          Câu hỏi: <LatexPreview text={question.question} />
        </div>
      }
      {question.choices && (
        <div className={styles.questionChoice}>
          {question.choices.map((choice) => (
            <div key={choice.label} className={styles.questionChoiceItem}>
              <div className={choice.correct ? `${styles.answer} ${styles.correct}` : `${styles.answer}`}>
                <p className={styles.label}>{choice.label}.</p>
                <p className={styles.text}><LatexPreview text={choice.text} /></p>
                <p className={styles.choice}>{choice.correct ? "✓" : ""}</p>
              </div>
              {choice.explain && (
                <p className={styles.explainOption}>
                  Giải thích: {choice.explain}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* PART 3 */}
      {question.type === "Part_3" && question.answer && (
        <div className={styles.answerPart3}>
          <strong>Đáp án:</strong> {question.answer}
        </div>
      )}

      {question.explanation && (
        <div className={styles.explain}>
          Giải thích: <LatexPreview text={question.explanation} />
        </div>
      )}

      <button onClick={onDelete} className={styles.delete}>Xoá</button>
      {state === "update" &&
        <button onClick={onUpdate} className={styles.update}>Sửa</button>
      }
    </div>
  );
}

export default QuestionPreviewCard;
