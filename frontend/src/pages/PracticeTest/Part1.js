import React from "react";
import LatexPreview from "../CreateExam/preview/LatexPreview";
import styles from "./PracticeTest.module.css";

function Part1({ question, answer, setAnswers }) {
  return (
    <div className={styles.choices}>
      {question.choices.map((choice) => (
        <label key={choice.label} className={styles.choice}>
          <input
            type="radio"
            name={`question-${question.questionId}`}
            value={choice.label}
            checked={answer === choice.label}
            onChange={(e) =>
              setAnswers((prev) => ({
                ...prev,
                [question.questionId]: e.target.value,
              }))
            }
          />
          <div className={styles.choiceLabel}>{choice.label}.</div>
          <div className={styles.choiceText}>
            <LatexPreview text={choice.text} />
          </div>
        </label>
      ))}
    </div>
  );
}

export default Part1;
