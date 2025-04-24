import { useEffect, useState } from "react";
import styles from "./ExamHistory.module.css";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom'


function ExamHistory() {
    const API = process.env.REACT_APP_API_URL;
    const [exams, setExams] = useState([])
    const { user, isAuthenticated } = useAuth() 
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
        else {
            axios.get(`${API}/users/completed/${user.userId}`)
            .then(res => {
                setExams(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },[])

    const handleClickReview = (completedId, examId, examName) => {
        navigate("/practice/review", {
            state: { completedId, examId, examName}
        })
    }
    
  return (
    <div className={styles.exam}>
        <div className="container">
            <div className="row">
                <table>
                    <thead>
                        <tr className={styles.examHead}>
                            <th className={styles.examHeadItem}>#</th>
                            <th className={styles.examHeadItem}>Mã bài</th>
                            <th className={styles.examHeadItem}>Đề thi</th>
                            <th className={styles.examHeadItem}>Thời gian bắt đầu</th>
                            <th className={styles.examHeadItem}>Thời gian kết thúc</th>
                            <th className={styles.examHeadItem}>Điểm</th>
                            <th className={styles.examHeadItem}>Xem lại</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exams.map((exam, index) => (
                            <tr key={index} className={styles.examBody}>
                                <td className={styles.examBodyItem}>{exam.id}</td>
                                <td className={styles.examBodyItem}>{exam.examId}</td>
                                <td className={styles.examBodyItem}>{exam.examName}</td>
                                <td className={styles.examBodyItem}>{exam.startTime}</td>
                                <td className={styles.examBodyItem}>{exam.endTime}</td>
                                <td className={styles.examBodyItem}>{exam.score}</td>
                                <td className={styles.examBodyItem} onClick={()=>handleClickReview(exam.completedId, exam.examId, exam.examName)}>show</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

export default ExamHistory;
