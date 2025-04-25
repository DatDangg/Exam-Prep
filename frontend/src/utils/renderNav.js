import styles from '../pages/PracticePage/PracticeTest/PracticeTest.module.css';

const renderNav = (
    questions,
    partLabel,
    answers,
    flags,
    questionRefs,
    readonly = false
) => (
    <>
        <div className={styles.navPartTitle}>{partLabel}</div>
        <div className={styles.navWrapper}>
            {questions.map((q, idx) => {
                const answer = answers[q.questionId]
                const isFlagged = flags[q.questionId]
                let status = "not-started"

                if (readonly) {
                    const correct = answer?._correct
                    if (correct === true) status = "correct"
                    else status = "wrong"
                    // else status = "not-started"
                }
                if (answer !== undefined && !readonly) {
                    if (q.type === "Part_1") status = answer ? "answered" : "incomplete"
                    else if (q.type === "Part_2") {
                        const options = ['A', 'B', 'C', 'D']
                        const valid = answer && options.every(opt => typeof answer[opt] === 'boolean')
                        status = valid ? "answered" : "incomplete"
                    } else if (q.type === "Part_3") {
                        const valid = answer && Object.keys(answer).length === 4 &&
                            Object.values(answer).every(val => val !== "")
                        status = valid ? "answered" : "incomplete"
                    }
                }
                return (
                    <div
                        key={q.questionId}
                        className={`
                            ${styles.navItem}
                            ${status === 'answered' ? styles.answered : ''}
                            ${status === 'incomplete' ? styles.incomplete : ''}
                            ${status === 'not-started' ? styles.notStarted : ''}
                            ${status === 'correct' ? styles.correct : ''}
                            ${status === 'wrong' ? styles.wrong : ''}
                        `}
                        onClick={() => {
                            const ref = questionRefs.current[q.questionId]
                            if (ref) ref.scrollIntoView({ behavior: "smooth", block: "start" })
                        }}
                    >
                        {idx + 1}
                        {!readonly && isFlagged && <div className={styles.flagDot} />}
                    </div>
                )
            })}
        </div>
    </>
)

export default renderNav
