import { useLocation } from 'react-router-dom'
import styles from './PracticeTest.module.css'
import { useEffect, useState } from 'react'
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

    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState({})

    useEffect(() => {
        axios.get(`${API}/questions/for-test/${examId}`)
            .then(res => {
                console.log(res.data)
                setQuestions(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    console.log(answers)

    return (
        <div className={styles.practice}>
            <div className='container'>
                <div className={styles.head}>
                    <div className={styles.heading}>{examName}</div>
                    <button className={styles.backBtn}>Back</button>
                </div>
                <div className={styles.countDown}>
                    <CountdownTimer initialSeconds={7200} />
                </div>
                <div className='row'>
                    {questions.map((question, idx) => (
                        <div key={question.questionId} className={styles.wrapper}>
                            <div className={styles.title}>
                                <div className={styles.questionNumber}>Câu {idx + 1}</div>
                                <button className={styles.flag}>Đánh dấu câu</button>
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
                <div>hihihi</div>
            </div>
        </div>
    )
}

export default PracticeTest