import { useEffect, useState } from 'react';
import styles from './ExamDetails.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ReactComponent as EditIcon } from '../../assets/img/edit-test.svg';


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

    const handleManage = () => {
        navigate("/exam/details/manage_ques", {
            state: { examId: examId },
        });
    }

    return (
        <div className={styles.examDetail}>
            <div className='container'>
                <div className={`row d-flex align-items-center ${styles.wrapper}`}>
                    <div className={`col-md-8 ${styles.infor}`}>
                        <div className={styles.name}>Đề thi: {exam.examName}</div>
                        <div className={styles.count}>Số lượng câu hỏi: {exam.questionCount} câu</div>
                    </div>
                    <div className='col-md-4 d-flex justify-content-end'>
                        <div className={styles.btnArea}>
                            {exam.questionCount !== 0 ?
                                <button className={styles.mBtn} onClick={() => handleManage()}>
                                    <EditIcon className={styles.icon} />
                                    <span>Quản lý câu hỏi</span>
                                </button>
                                :
                                <button className={styles.aBtn} onClick={() => handleAdd()}>
                                    <EditIcon className={styles.icon} />
                                    <span>Thêm câu hỏi</span>
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <div className={`row d-flex align-items-center ${styles.wrapper}`}>
                    
                </div>
            </div>
        </div>
    )
}

export default ExamDetails