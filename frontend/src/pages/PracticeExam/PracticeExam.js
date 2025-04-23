import { useEffect, useState } from 'react'
import styles from './PracticeExam.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function PracticeExam() {
    const API = process.env.REACT_APP_API_URL;
    const [exams, setExams] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${API}/exams/summary`)
            .then(res => {
                setExams(res.data)
            })
            .catch(err => console.log(err))
    },[])

    const handleClick = (value) => {
        navigate("/practice/detail", {
            state: {examId: value}
        })
    }

    return (
        <div className={styles.practice}>
            <div className='container'>
                <div className='row'>
                    {exams.map(exam => (
                        <div key={exam.examId} className='col-md-3' onClick={() => handleClick(exam.examId)}> 
                            <div className={`${styles.wrapper}`}>
                                <div className={styles.wrap}>
                                    <span className={styles.title}>Tên đề:</span>
                                    <div className={styles.desc}>{exam.examName}</div>
                                </div>
                                <div className={styles.wrap}>
                                    <span className={styles.title}>Số câu:</span>
                                    <div className={styles.desc}>{exam.questionCount}</div>
                                </div>
                                <div className={styles.wrap}>
                                    <span className={styles.title}>Lượt thi:</span>
                                    <div className={styles.desc}>120</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PracticeExam