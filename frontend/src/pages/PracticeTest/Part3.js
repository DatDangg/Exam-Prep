import styles from "./PracticeTest.module.css";

const digits = ["-", ",", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function Part3RadioGrid({ questionId, answer = {}, setAnswers }) {
  const handleChange = (colIndex, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [colIndex]: value,
      },
    }));
  };

  return (
    <div className={styles.part3}>
      <table className={styles.part3Table}>
        <tbody>
          {digits.map((digit) => (
            <tr key={digit}>
              <td className={styles.part3Text}>{digit}</td>
              {[0, 1, 2, 3].map((col) => (
                <td key={col} className={styles.part3Input}>
                  <input
                    type="radio"
                    name={`col-${col}-${questionId}`}
                    value={digit}
                    checked={answer[col] === digit}
                    onChange={() => handleChange(col, digit)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Part3RadioGrid;
