import { useEffect, useState } from 'react';
import styles from './ExamDetails.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

function ExamDetails() {
    const location = useLocation();
    const examId = location.state?.examId || "";
    const [exam, setExam] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8080/api/exams/${examId}/detail`)
        .then(res => {
            setExam(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    const handleAdd = () => {
        navigate("/exam/create", {
            state: { examId: examId },
        });
    }
    return (
        <div className={styles.examDetail}>
            <div className='container'>
                <div className='row'>
                    <div>{exam.examName}</div> 
                    <div>{exam.questionCount} câu</div>
                    <button>
                        {exam.questionCount !== 0 ? 
                            <div>Quản lý câu hỏi</div> 
                            : 
                            <div onClick={() => handleAdd()}>Thêm câu hỏi</div>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ExamDetails