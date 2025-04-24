import styles from "./PracticeTest.module.css";

const digits = ["-", ",", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function Part3({ questionId, answer = {}, setAnswers, readonly, question }) {
  const correctStr = question.answer;

  const userAnswer = {
    0: "",
    1: "",
    2: "",
    3: "",
    ...(answer?.answer || answer || {}),
  };

  const handleChange = (colIndex, value) => {
    if (readonly) return;

    if (
      (userAnswer[0] === "-" && value === "," && colIndex === 1) ||
      (userAnswer[1] === "," && value === "-" && colIndex === 0) ||
      (userAnswer[1] === "," && value === "," && colIndex === 2) ||
      (userAnswer[2] === "," && value === "," && colIndex === 1)
    )
      return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [colIndex]: value,
      },
    }));
  };

  return (
    <>
      <div className={styles.part3}>
        <table className={styles.part3Table}>
          <tbody>
            {digits.map((digit) => (
              <tr key={digit}>
                <td className={styles.part3Text}>{digit}</td>

                {(digit === "-") &&
                  [0].map((col) => (
                    <td key={col} className={styles.part3Input}>
                      <input
                        type="radio"
                        name={`col-${col}-${questionId}`}
                        value={digit}
                        checked={userAnswer[col] === digit}
                        onChange={() => handleChange(col, digit)}
                        disabled={readonly}
                      />
                    </td>
                  ))}

                {(digit === ",") &&
                  [0, 1, 2, 3].map((col) => (
                    <td key={col} className={styles.inputPart3}>
                      <input
                        type="radio"
                        name={`col-${col}-${questionId}`}
                        value={digit}
                        checked={userAnswer[col] === digit}
                        onChange={() => handleChange(col, digit)}
                        disabled={readonly}
                      />
                    </td>
                  ))}

                {(digit !== "-") &&
                  (digit !== ",") &&
                  [0, 1, 2, 3].map((col) => (
                    <td key={col} className={styles.part3Input}>
                      <input
                        type="radio"
                        name={`col-${col}-${questionId}`}
                        value={digit}
                        checked={userAnswer[col] === digit}
                        onChange={() => handleChange(col, digit)}
                        disabled={readonly}
                      />
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {readonly && (
        <div className={styles.correctAnswer}>
          Đáp án đúng: {correctStr}
        </div>
      )}
    </>
  );
}

export default Part3;
