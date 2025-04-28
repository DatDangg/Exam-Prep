import { useEffect, useState } from "react";
import styles from "./ExamHistory.module.css";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import { useLocation, useNavigate } from 'react-router-dom'


function ExamHistory() {
  const API = process.env.REACT_APP_API_URL;
  const [exams, setExams] = useState([])
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get(`${API}/users/completed/${user.userId}`)
      .then(res => {
        setExams(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleClickReview = (completedId, examId, examName) => {
    navigate("/practice/review", {
      state: { completedId, examId, examName, from: location.pathname }
    })
  }
  const sortExams = (field) => {
    const sorted = [...exams].sort((a, b) => {
      const aField = a[field]?.toLowerCase?.() || a[field];
      const bField = b[field]?.toLowerCase?.() || b[field];

      if (sortOrder === "asc") {
        return aField > bField ? 1 : -1;
      } else {
        return aField < bField ? 1 : -1;
      }
    });

    setExams(sorted);
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredExams = exams.filter((exam) =>
    exam.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <>
      {exams.length == 0 ?
        <div className={styles.noti}> Bạn chưa làm đề nào cả 😤 </div>
        :
        <>
          <div className="col-md-4 offset-md-8">
            <input
              type="text"
              className={styles.input}
              placeholder="Tìm đề thi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.exam}>
            <div className="container">
              <div className="row">

                <div className={styles.wrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr className={styles.examHead}>
                        <th className={`${styles.examHeadItem} ${styles.index}`}>#</th>
                        <th
                          className={`${styles.examHeadItem} ${styles.idTest}`}
                          onClick={() => sortExams("examId")}
                        >
                          Mã bài thi {sortField === "examId" && <i className={sortOrder === "desc" ? `fas fa-arrow-up-wide-short` : `fas fa-arrow-up-short-wide`}></i>}
                        </th>
                        <th
                          className={styles.examHeadItem}
                          onClick={() => sortExams("examName")}
                        >
                          Tên đề thi {sortField === "examName" && <i className={sortOrder === "desc" ? `fas fa-arrow-up-wide-short` : `fas fa-arrow-up-short-wide`}></i>}
                        </th>

                        <th className={styles.examHeadItem}>Thời gian bắt đầu</th>
                        <th className={styles.examHeadItem}>Thời gian kết thúc</th>
                        <th className={`${styles.examHeadItem} ${styles.score}`}>Điểm</th>
                        <th className={`${styles.examHeadItem} ${styles.review}`}>Xem lại</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredExams.map((exam, index) => (
                        <tr key={index} className={styles.examBody}>
                          <td className={`${styles.examBodyItem} ${styles.index}`}>{index + 1}</td>
                          <td className={`${styles.examBodyItem} ${styles.idTest}`}>{exam.completedId}</td>
                          <td className={styles.examBodyItem}>{exam.examName}</td>
                          <td className={styles.examBodyItem}>{exam.startTime}</td>
                          <td className={styles.examBodyItem}>{exam.endTime}</td>
                          <td className={`${styles.examBodyItem} ${styles.score}`}>{exam.score}</td>
                          <td
                            className={`${styles.examBodyItem} ${styles.review}`}
                            onClick={() =>
                              handleClickReview(exam.completedId, exam.examId, exam.examName)
                            }
                          >
                            👀
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              </div>
            </div>
          </div>
        </>}
    </>
  );
}

export default ExamHistory;
