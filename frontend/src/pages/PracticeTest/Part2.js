import React from "react";
import LatexPreview from "../CreateExam/preview/LatexPreview";
import styles from "./PracticeTest.module.css";

function Part2({ question, answer={}, setAnswers, readonly }) {
  const correctMap = {};
  question.choices.forEach(choice => {
    correctMap[choice.label] = choice.correct;
  });

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>Đúng</th>
            <th>Sai</th>
          </tr>
        </thead>
        <tbody>
          {question.choices.map((choice) => {
            let userChoice
            if (readonly) userChoice = answer.answer?.[choice.label];
            else userChoice = answer?.[choice.label];
            return (
              <tr key={choice.label}>
                <td>
                  <span className={styles.choiceLabel}>{choice.label}. </span>
                  <LatexPreview text={choice.text} />
                </td>
                <td>
                  <input
                    type="radio"
                    disabled={readonly}
                    checked={userChoice === true}
                    onChange={() => {
                      if (!readonly) {
                        setAnswers((prev) => ({
                          ...prev,
                          [question.questionId]: {
                            ...prev[question.questionId],
                            [choice.label]: true,
                          },
                        }));
                      }
                    }}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    disabled={readonly}
                    checked={userChoice === false}
                    onChange={() => {
                      if (!readonly) {
                        setAnswers((prev) => ({
                          ...prev,
                          [question.questionId]: {
                            ...prev[question.questionId],
                            [choice.label]: false,
                          },
                        }));
                      }
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {readonly && (
        <div className={styles.correctAnswer}>
          Đáp án đúng:&nbsp;
          {question.choices.map(choice =>
            `${choice.label}-${choice.correct ? "đúng" : "sai"}`
          ).join(', ')}
        </div>
      )}
    </>
  );
}


export default Part2;
