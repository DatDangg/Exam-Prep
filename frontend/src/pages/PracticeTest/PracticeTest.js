import { useLocation, useNavigate } from 'react-router-dom'
import styles from './PracticeTest.module.css'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import LatexPreview from '../CreateExam/preview/LatexPreview'
import CountdownTimer from '../../utils/countDown'
import Part3 from './Part3'
import Part1 from './Part1'
import Part2 from './Part2'

function PracticeTest() {
    const API = process.env.REACT_APP_API_URL
    const location = useLocation()
    const examId = location?.state.examId || ""
    const examName = location?.state.examName || ""
    const examCount = location?.state.examCount || ""
    const navigate = useNavigate()
    const questionRefs = useRef({});


    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState({})
    const [flags, setFlags] = useState({})


    useEffect(() => {
        axios.get(`${API}/questions/for-test/${examId}`)
            .then(res => {
                console.log(res.data)
                setQuestions(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleBack = () => {
        navigate("/practice/detail", {
            state: { examId }
        })
        localStorage.removeItem("countdownEndTime");
    }

    return (
        <div className={styles.practice}>
            <div className={styles.layout}>
                <div className={styles.practiceContent}>
                    <div className={styles.head}>
                        <div className={styles.heading}>{examName}</div>
                        <button className={styles.backBtn} onClick={handleBack}>Back</button>
                    </div>
                    <div className={styles.countDown}>
                        <CountdownTimer initialSeconds={7200} />
                    </div>
                    <div className='row'>
                        {questions.map((question, idx) => (
                            <div
                                key={question.questionId}
                                ref={(el) => (questionRefs.current[question.questionId] = el)}
                                className={styles.wrapper}
                            >
                        
                                <div className={styles.title}>
                                    <div className={styles.questionNumber}>Câu {idx + 1}</div>
                                    <button
                                        className={styles.flag}
                                        onClick={() =>
                                            setFlags((prev) => ({
                                                ...prev,
                                                [question.questionId]: !prev[question.questionId],
                                            }))
                                        }
                                    >
                                        Đánh dấu câu
                                    </button>

                                    {/* <div className={styles.questionId}>{question.questionId}</div> */}
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.question}><LatexPreview text={question.question} /></div>
                                    {question.type === "Part_1" &&
                                        <Part1
                                            question={question}
                                            answer={answers[question.questionId]}
                                            setAnswers={setAnswers}
                                        />
                                    }

                                    {question.type === "Part_2" &&
                                        <Part2
                                            question={question}
                                            answer={answers[question.questionId]}
                                            setAnswers={setAnswers}
                                        />
                                    }

                                    {question.type === "Part_3" &&
                                        <Part3
                                            questionId={question.questionId}
                                            answer={answers[question.questionId]}
                                            setAnswers={setAnswers}
                                        />
                                    }

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.sideBar}>
                    <div className={styles.navTitle}>Quiz Navigation</div>
                    <div className={styles.navGrid}>
                        {questions.map((q, idx) => {
                            const ans = answers[q.questionId];
                            const isFlagged = flags[q.questionId];

                            let status = "not-started"; 

                            if (ans !== undefined) {
                                if (q.type === "Part_1") {
                                    status = ans ? "answered" : "incomplete";
                                } else if (q.type === "Part_2") {
                                    const options = ['A', 'B', 'C', 'D'];
                                    const valid =
                                        ans && options.every(opt => typeof ans[opt] === 'boolean');
                                    status = valid ? "answered" : "incomplete";
                                } else if (q.type === "Part_3") {
                                    const valid =
                                        ans && Object.keys(ans).length === 4 &&
                                        Object.values(ans).every(val => val !== "");
                                    status = valid ? "answered" : "incomplete";
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
                                    `}
                                    onClick={() => {
                                        const ref = questionRefs.current[q.questionId];
                                        if (ref) {
                                            ref.scrollIntoView({ behavior: "smooth", block: "start" });
                                        }
                                    }}
                                >
                                    {idx + 1}
                                    {isFlagged && <div className={styles.flagDot} />}
                                </div>

                            );
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PracticeTest