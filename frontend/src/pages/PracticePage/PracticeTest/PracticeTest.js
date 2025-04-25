import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import CountdownTimer from '../../../utils/CountdownTimer'
import Part3 from './TestPart/Part3'
import Part1 from './TestPart/Part1'
import Part2 from './TestPart/Part2'
import renderNav from '../../../utils/renderNav'
import styles from './PracticeTest.module.css'
import RenderQuestions from '../../../utils/renderQuestions'

function PracticeTest() {
    const API = process.env.REACT_APP_API_URL
    const { user } = useAuth()
    const location = useLocation()
    const examId = location?.state.examId || ""
    const examName = location?.state.examName || ""
    const navigate = useNavigate()
    const questionRefs = useRef({})
    const timerRef = useRef()

    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState({})
    const [flags, setFlags] = useState({})

    const part1Questions = questions.filter(q => q.type === "Part_1")
    const part2Questions = questions.filter(q => q.type === "Part_2")
    const part3Questions = questions.filter(q => q.type === "Part_3")

    useEffect(() => {
        axios.get(`${API}/questions/for-test/${examId}`)
            .then(res => {
                setQuestions(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleBack = () => {
        navigate("/practice/detail", { state: { examId } })
        localStorage.removeItem("countdownEndTime")
    }

    useEffect(() => {
        return () => {
            if (location.pathname === "/practice/test") {
                localStorage.removeItem("countdownEndTime")
            }
        }
    }, [location.pathname])

    const handleSubmit = () => {
        const timeTaken = timerRef.current?.getTimeTaken?.() || 0
        axios.post(`${API}/submit/grade`, {
            userId: user.userId,
            examId,
            answers,
            timeTaken
        })
            .then(res => {
                const completedId = res.data.completedId
                navigate("/practice/review", {
                    state: {
                        completedId,
                        examName,
                        examId
                    }
                })
                localStorage.removeItem("countdownEndTime")
            })
            .catch(err => console.error("Lỗi khi nộp bài:", err))
    }

    return (
        <div className={styles.practice}>
            <div className={styles.layout}>
                <div className={styles.practiceContent}>
                    <div className={styles.head}>
                        <div className={styles.heading}>{examName}</div>
                        <button className={styles.backBtn} onClick={handleBack}>Quay lại</button>
                    </div>
                    <div className={styles.countDown}>
                        <CountdownTimer ref={timerRef} initialSeconds={5400} onTimeUp={handleSubmit} />
                    </div>
                    <div className='row'>
                        <RenderQuestions
                            questions={part1Questions}
                            PartComponent={Part1}
                            partTitle="Phần I"
                            questionRefs={questionRefs}
                            answers={answers}
                            setAnswers={setAnswers}
                            flags={flags}
                            setFlags={setFlags}
                        />
                        <RenderQuestions
                            questions={part2Questions}
                            PartComponent={Part2}
                            partTitle="Phần II"
                            questionRefs={questionRefs}
                            answers={answers}
                            setAnswers={setAnswers}
                            flags={flags}
                            setFlags={setFlags}
                        />
                        <RenderQuestions
                            questions={part3Questions}
                            PartComponent={Part3}
                            partTitle="Phần III"
                            questionRefs={questionRefs}
                            answers={answers}
                            setAnswers={setAnswers}
                            flags={flags}
                            setFlags={setFlags}
                        />

                    </div>
                </div>
                <div className={styles.sideBar}>
                    <div className={styles.navFlex}>
                        {renderNav(part1Questions, "Phần I", answers, flags, questionRefs)}
                        {renderNav(part2Questions, "Phần II", answers, flags, questionRefs)}
                        {renderNav(part3Questions, "Phần III", answers, flags, questionRefs)}
                    </div>
                    <div className={styles.submit} onClick={handleSubmit}>Nộp bài</div>
                </div>
            </div>
        </div>
    )
}

export default PracticeTest
