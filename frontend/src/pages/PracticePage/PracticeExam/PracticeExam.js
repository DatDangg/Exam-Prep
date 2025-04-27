import { useEffect, useState } from 'react';
import styles from './PracticeExam.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import UpgradePopup from '../../../components/UpgradePopup/UpgradePopup';

function PracticeExam() {
    const API = process.env.REACT_APP_API_URL;
    const [exams, setExams] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [showUpgradePopup, setShowUpgradePopup] = useState(false);
    const [isShowingPayment, setIsShowingPayment] = useState(false);

    useEffect(() => {
        axios.get(`${API}/exams/summary`)
            .then(res => {
                const sortedExams = res.data.sort((a, b) => {
                    if (a.locked === b.locked) return 0;
                    return a.locked ? 1 : -1;
                });
                setExams(sortedExams.filter(res => res.questionCount !==0));
            })
            .catch(err => console.log(err));
    }, []);

    const handleClick = (exam) => {
        if (exam.locked && user?.account !== 'VIP') {
            setMessage('Đề thi này chỉ dành cho tài khoản VIP. Vui lòng');
            return;
        }
        setMessage('');
        navigate("/practice/detail", {
            state: { examId: exam.examId }
        });
    };

    return (
        <div className={styles.practice}>
            <div className='container'>
                {message && (
                    <div className={styles.noti}>
                        {message}
                        {' '}
                        <span onClick={() => setShowUpgradePopup(true)} className={styles.upgradeText}>
                            nâng cấp tài khoản
                        </span>
                        {' '}
                        để truy cập.
                    </div>
                )}
                {showUpgradePopup && (
                    <UpgradePopup
                        showPayment={isShowingPayment}
                        onClose={() => {
                            setShowUpgradePopup(false);
                            setIsShowingPayment(false);
                        }}
                        onSwitchToPayment={() => setIsShowingPayment(true)}
                        onConfirmPayment={() => alert('Xử lý sau khi thanh toán')}
                    />
                )}

                <div className={styles.accountType}>
                    Tài khoản của bạn là: <span>{user?.account}</span>
                </div>
                <div className={styles.wrapp}>
                    <div className='row'>
                        {exams.map(exam => (
                            <div key={exam.examId} className='col-lg-2 col-6 mb-5'>
                                <div
                                    className={exam.locked && user?.account !== 'VIP' ? styles.locked : styles.unlocked}
                                    onClick={() => handleClick(exam)}
                                >
                                    {exam.locked && user?.account !== 'VIP' &&
                                        <svg className={styles.lock} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4 6V4C4 1.79086 5.79086 0 8 0C10.2091 0 12 1.79086 12 4V6H14V16H2V6H4ZM6 4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4V6H6V4ZM7 13V9H9V13H7Z" fill="#000000" />
                                        </svg>
                                    }
                                    <div className={styles.wrapper}>
                                        <div className={styles.wrap}>
                                            <div className={styles.title}>{exam.examName}</div>
                                            <div className={styles.infor}>
                                                <span>90 phút |</span>
                                                <span>{exam.attemptCount} lượt làm</span>
                                            </div>
                                        </div>
                                        <button className={styles.button}>Xem chi tiết</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PracticeExam;
