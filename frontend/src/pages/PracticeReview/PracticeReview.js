import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../PracticeTest/PracticeTest.module.css'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import renderNav from '../../utils/renderNav'
import Part1 from '../PracticeTest/Part1'
import Part2 from '../PracticeTest/Part2'
import Part3 from '../PracticeTest/Part3'
import RenderQuestions from '../../utils/renderQuestions'

function PracticeReview() {
    const API = process.env.REACT_APP_API_URL
    const location = useLocation()
    const examId = location?.state.examId || ""
    const examName = location?.state.examName || ""
    const completedId = location?.state.completedId || ""
    const navigate = useNavigate()
    const questionRefs = useRef({})
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState({})
    console.log(answers)
    const part1Questions = questions.filter(q => q.type === "Part_1")
    const part2Questions = questions.filter(q => q.type === "Part_2")
    const part3Questions = questions.filter(q => q.type === "Part_3")

    useEffect(() => {
        if (!completedId) return;
        axios.get(`${API}/submit/review/${completedId}`)
            .then(res => {
                const mapped = {}
                res.data.forEach(ans => {
                    mapped[ans.questionId] = {
                        answer: { ...JSON.parse(ans.answerJson) },
                        _correct: ans.correct
                    }
                })
                setAnswers(mapped)

            })
            .catch(err => console.log(err))
    }, [completedId])

    useEffect(() => {
        axios.get(`${API}/questions/by-exam/${examId}`)
            .then(res => {
                setQuestions(res.data)
            })
            .catch(err => console.log(err))
    }, [examId])

    const handleBack = () => {
        if (window.history.length > 2) {
            navigate(-1)
        } else {
            navigate("/practice/detail", { state: { examId } })
        }
    }
    

    return (
        <div className={styles.practice}>
            <div className={styles.layout}>
                <div className={styles.practiceContent}>
                    <div className={styles.head}>
                        <div className={styles.heading}>{examName}</div>

                    </div>
                    <div className="row">
                        <RenderQuestions
                            questions={part1Questions}
                            PartComponent={Part1}
                            partTitle="Phần I"
                            questionRefs={questionRefs}
                            answers={answers}
                            setAnswers={() => { }}
                            flags={{}}
                            setFlags={() => { }}
                            readonly={true}
                        />
                        <RenderQuestions
                            questions={part2Questions}
                            PartComponent={Part2}
                            partTitle="Phần II"
                            questionRefs={questionRefs}
                            answers={answers}
                            setAnswers={() => { }}
                            flags={{}}
                            setFlags={() => { }}
                            readonly={true}
                        />
                        <RenderQuestions
                            questions={part3Questions}
                            PartComponent={Part3}
                            partTitle="Phần III"
                            questionRefs={questionRefs}
                            answers={answers}
                            setAnswers={() => { }}
                            flags={{}}
                            setFlags={() => { }}
                            readonly={true}
                        />

                    </div>
                </div>
                <div className={styles.sideBar}>
                    <div className={styles.navFlex}>
                        {renderNav(part1Questions, "Phần I", answers, {}, questionRefs, true)}
                        {renderNav(part2Questions, "Phần II", answers, {}, questionRefs, true)}
                        {renderNav(part3Questions, "Phần III", answers, {}, questionRefs, true)}
                    </div>
                    <button className={styles.backBtn} onClick={handleBack}>Quay lại</button>
                </div>
            </div>
        </div>
    )
}

export default PracticeReview
