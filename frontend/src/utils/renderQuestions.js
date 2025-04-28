import { useEffect, useState } from 'react'

import styles from '../pages/PracticePage/PracticeTest/PracticeTest.module.css';
import LatexPreview from '../pages/ExamPage/CreateExam/preview/LatexPreview';

const RenderQuestions = ({
    questions,
    PartComponent,
    partTitle,
    questionRefs,
    answers,
    setAnswers,
    flags,
    setFlags,
    readonly = false
}) => {
    const [showExplain, setShowExplain] = useState({});

    const toggleExplain = (id) => {
        setShowExplain(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <>
            <div className={styles.partTitle}>{partTitle}</div>
            {questions.map((q, idx) => (
                <div
                    key={q.questionId}
                    ref={(el) => questionRefs.current[q.questionId] = el}
                    className={styles.wrapper}
                >
                    <div className={styles.title}>
                        <div className={styles.questionNumber}>Câu {idx + 1}</div>
                        {!readonly && (
                            <button
                                className={styles.flag}
                                onClick={() =>
                                    setFlags(prev => ({
                                        ...prev,
                                        [q.questionId]: !prev[q.questionId]
                                    }))
                                }
                            >
                                Đánh dấu câu
                            </button>
                        )}
                    </div>

                    <div className={styles.content}>
                        <div className={styles.question}><LatexPreview text={q.question} /></div>
                        <PartComponent
                            question={q}
                            answer={answers[q.questionId]}
                            setAnswers={setAnswers}
                            questionId={q.questionId}
                            readonly={readonly}
                        />

                        {readonly && (
                            <div>
                                <div
                                    className={styles.explainTitle}
                                    onClick={() => toggleExplain(q.questionId)}
                                >
                                    Giải thích chi tiết đáp án <i className="fas fa-caret-down"></i>
                                </div>

                                <div
                                    className={`${styles.explainWrapper} ${showExplain[q.questionId] ? styles.show : ''}`}
                                >
                                    {q.type === "Part_2"
                                        ? q.choices.map((c, idx) =>
                                            <div key={idx} className={styles.explain}>
                                                {c.label}. <LatexPreview text={c.explain} />
                                            </div>)
                                        : <LatexPreview text={q.explanation} />}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default RenderQuestions;
