import { useEffect, useState } from "react";
import styles from "./ExamHistory.module.css";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

function ExamHistory() {
    const [exams, setExams] = useState([])
    const { user } = useAuth() 

    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/completed/${user.userId}`)
        .then(res => {
            setExams(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
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
                                <td className={styles.examBodyItem}>show</td>
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
