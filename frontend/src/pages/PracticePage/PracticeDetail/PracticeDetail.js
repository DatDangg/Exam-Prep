import { useLocation, useNavigate } from 'react-router-dom';
import styles from './PracticeDetail.module.css';
import { useAuth } from '../../../hooks/useAuth';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PracticeDetail() {
    const API = process.env.REACT_APP_API_URL;
    const location = useLocation();
    const { user } = useAuth();
    const [exam, setExam] = useState({})
    const [completed, setCompleted] = useState([])
    const examId = location.state?.examId || "";

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${API}/exams/${examId}/detail`)
            .then(res => {
                setExam(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (!user) return;

        axios.get(`${API}/exams/completed`, {
            params: { examId, userId: user.userId }
        })
            .then(res => {
                setCompleted(res.data)
            })
            .catch(err => console.log(err));
    }, [user]);

    const handleClickTest = () => {
        navigate("/practice/test", {
            state: { examId, examName: exam.examName }
        })
    }

    const handleClickReview = (completedId) => {
        navigate("/practice/review", {
            state: { completedId, examId, examName: exam.examName, from: location.pathname }
        })
    }

    const handleBack = () => {
        navigate("/practice/")
    }

    return (
        <div className={styles.practice}>
            <div className='container'>
                <div className='row'>
                    <button className={styles.button} onClick={handleBack}>Quay lại</button>
                    <div className={styles.title}>{exam.examName}</div>
                </div>
                <div className='row'>
                    <div className={styles.history}>Lịch sử làm bài</div>
                    <div className={styles.wrap}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian bắt đầu</th>
                                    <th>Thời gian kết thúc</th>
                                    <th>Điểm</th>
                                    <th>Xem lại</th>
                                </tr>
                            </thead>
                            <tbody>
                                {completed.map((exam, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{exam.startTime}</td>
                                        <td>{exam.endTime}</td>
                                        <td>{exam.score}</td>
                                        <td onClick={() => handleClickReview(exam.completedId)}>👀</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className='row d-flex justify-content-center'>
                    <button onClick={handleClickTest} className={styles.btn}>Làm bài</button>
                </div>
            </div>
        </div>
    );
}

export default PracticeDetail;
