import React from "react";
import LatexPreview from "../CreateExam/preview/LatexPreview";
import styles from "./PracticeTest.module.css";

function Part2({ question, answer, setAnswers }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          <th>Đúng</th>
          <th>Sai</th>
        </tr>
      </thead>
      <tbody>
        {question.choices.map((choice) => (
          <tr key={choice.label}>
            <td>
              <span className={styles.choiceLabel}>{choice.label}. </span>
              <LatexPreview text={choice.text} />
            </td>
            <td>
              <input
                type="radio"
                name={`question-${question.questionId}-${choice.label}`}
                value="true"
                checked={answer?.[choice.label] === true}
                onChange={() =>
                  setAnswers((prev) => ({
                    ...prev,
                    [question.questionId]: {
                      ...prev[question.questionId],
                      [choice.label]: true,
                    },
                  }))
                }
              />
            </td>
            <td>
              <input
                type="radio"
                name={`question-${question.questionId}-${choice.label}`}
                value="false"
                checked={answer?.[choice.label] === false}
                onChange={() =>
                  setAnswers((prev) => ({
                    ...prev,
                    [question.questionId]: {
                      ...prev[question.questionId],
                      [choice.label]: false,
                    },
                  }))
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Part2;
