import React from "react";
import LatexPreview from "../../../ExamPage/CreateExam/preview/LatexPreview";
import styles from "../PracticeTest.module.css";

function Part1({ question, answer, setAnswers, readonly }) {
  const correctAnswer = question.choices.find(choice => choice.correct)?.label;

  return (
    <>
      <div className={styles.choices}>
        {question.choices.map((choice) => {
          let isSelected
          if (readonly) {isSelected = answer?.answer[0] === choice.label;}
          else {isSelected = answer === choice.label;}
          const isCorrect = choice.label === correctAnswer;
          const isWrong = isSelected && !isCorrect;

          return (
            <label key={choice.label} className={readonly ? `${styles.choice} ${styles.readonly}`: `${styles.choice}`}>
              <input
                type="radio"
                name={`question-${question.questionId}`}
                value={choice.label}
                checked={isSelected}
                disabled={readonly}
                onChange={(e) =>
                  !readonly &&
                  setAnswers((prev) => ({
                    ...prev,
                    [question.questionId]: e.target.value,
                  }))
                }
              />
              <div className={`
                ${styles.choiceContent}
                ${readonly && isCorrect && isSelected ? styles.correct : ''}
                ${readonly && isWrong ? styles.check : ''}
              `}>
                <div className={styles.choiceLabel}>{choice.label}.</div>
                <div>
                  <LatexPreview text={choice.text} />
                </div>
              </div>
            </label>
          );
        })}
      </div>
      {readonly && (
        <div className={styles.correctAnswer}>Đáp án đúng: {correctAnswer}</div>
      )}
    </>
  );
}


export default Part1;
