import { useEffect, useRef, useState } from 'react';
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
    const wrapRef = useRef()
    const fixRef = useRef()
   

    useEffect(() => {
        axios.get(`${API}/exams/${examId}/detail`)
            .then(res => {
                setExam(res.data)
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
        handleToggleFix()
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

    const handleToggleFix = () => {
        if (wrapRef.current.classList.contains(`${styles.close}`)) {
            wrapRef.current.classList.remove(`${styles.close}`)
            fixRef.current.classList.remove(`${styles.open}`)    
        }
        else {
            wrapRef.current.classList.add(`${styles.close}`)
            fixRef.current.classList.add(`${styles.open}`)
        }
    }

    return (
        <div className={styles.examDetail}>
            <div className='container'>
                <div className={`row ${styles.wrapper}`}>
                    <div className={styles.wrap} ref={wrapRef}>
                        <div className={`col-md-8 ${styles.infor}`}>
                            <div className={styles.name}>Đề thi: 
                                <span id={styles.nameEdit}  onClick={handleToggleFix}>
                                    {exam.examName}
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                                            fill="#ccc"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <div className={styles.detail}>Số lượng câu hỏi: {exam.questionCount} câu</div>
                            <div className={styles.detail}>Mở cho tài khoản: {accountAccess}</div>
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
                    <div className={`${styles.wrap} ${styles.close}`} ref={fixRef}>
                        <div className={styles.fix}>
                            <span className={styles.fixTitle}>Sửa tên đề:</span>
                            <input value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
                        </div>
                        <div className={styles.fix}>
                            <span className={styles.fixTitle}>Mở cho tài khoản:</span>
                            <select value={accountAccess} onChange={(e) => setAccountAccess(e.target.value)} >
                                <option>VIP</option>
                                <option>Miễn phí</option>
                            </select>
                        </div>
                        <div className={styles.fix}>
                            <button className={styles.saveBtn} onClick={handleSave}>
                            Lưu thay đổi
                            </button>
                            <button className={styles.backBtn} onClick={handleToggleFix}>
                            Huỷ
                            </button>
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