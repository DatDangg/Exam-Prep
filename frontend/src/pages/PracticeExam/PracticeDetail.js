import { useLocation, useNavigate } from 'react-router-dom';
import styles from './PracticeDetail.module.css';
import { useAuth } from '../../hooks/useAuth';
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
    },[])

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

    const handleClick = () => {
        navigate("/practice/test", {
            state: {examId, examName:exam.examName}
        })
    }

    return (
        <div className={styles.practice}>
            <div className='container'>
                <div className='row'>
                    <div className={styles.title}>{exam.examName}</div>
                </div>
                <div className='row'>
                    <div>Lịch sử làm bài</div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>STT</th>
                                <th className={styles.th}>Thời gian bắt đầu</th>
                                <th className={styles.th}>Thời gian kết thúc</th>
                                <th className={styles.th}>Điểm</th>
                                <th className={styles.th}>Xem lại</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completed.map((exam, idx) => (
                                <tr key={idx}>
                                    <td className={styles.td}>{idx+1}</td>
                                    <td className={styles.td}>{exam.startTime}</td>
                                    <td className={styles.td}>{exam.endTime}</td>
                                    <td className={styles.td}>{exam.score}</td>
                                    <td className={styles.td}>👀</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='row'>
                    <button onClick={handleClick}>Làm bài</button>
                </div>
            </div>
        </div>
    );
}

export default PracticeDetail;
