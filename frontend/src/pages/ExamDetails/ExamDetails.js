import { useEffect, useState } from 'react';
import styles from './ExamDetails.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { ReactComponent as EditIcon } from '../../assets/img/edit-test.svg';


function ExamDetails() {
    const API = process.env.REACT_APP_API_URL;
    const location = useLocation();
    const examId = location.state?.examId || "";
    const [exam, setExam] = useState([])
    const [updatedName, setUpdatedName] = useState("");
    const [accountAccess, setAccountAccess] = useState("Miễn phí");
    const navigate = useNavigate()
    

    useEffect(() => {
        axios.get(`${API}/exams/${examId}/detail`)
            .then(res => {
                setExam(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (exam.examName) {
          setUpdatedName(exam.examName);
          setAccountAccess(exam.locked ? "VIP" : "Miễn phí");
        }
    }, [exam]);

    const handleSave = () => {
        axios.put(`${API}/exams/${examId}`, {
          examName: updatedName,
          locked: accountAccess === "VIP"
        })
        .then(() => {
          toast("Cập nhật thành công");
        })
        .catch((err) => {
          console.error("Lỗi khi cập nhật đề:", err);
          toast("Có lỗi xảy ra khi cập nhật");
        });
    };
    

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
                        <div className={styles.name}>Đề thi: <span id={styles.nameEdit}>{exam.examName}</span></div>
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
  <div className={styles.fix}>
    <span>Sửa tên đề:</span>
    <input
      value={updatedName}
      onChange={(e) => setUpdatedName(e.target.value)}
    />
  </div>
  <div className={styles.fix}>
    <span>Mở cho tài khoản:</span>
    <select
      value={accountAccess}
      onChange={(e) => setAccountAccess(e.target.value)}
    >
      <option>VIP</option>
      <option>Miễn phí</option>
    </select>
  </div>
  <div className={styles.fix}>
    <button className={styles.saveBtn} onClick={handleSave}>
      Lưu thay đổi
    </button>
  </div>
</div>

                <div className={`row d-flex align-items-center ${styles.wrapper}`}>
                    
                </div>
            </div>
        </div>
    )
}

export default ExamDetails