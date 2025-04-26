import { useEffect, useState } from 'react'
import styles from './PracticeExam.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth';

function PracticeExam() {
    const API = process.env.REACT_APP_API_URL;
    const [exams, setExams] = useState([])
    const { user } = useAuth()
    const navigate = useNavigate()
    const [message, setMessage] = useState(''); // thêm message nè

    useEffect(() => {
        axios.get(`${API}/exams/summary`)
            .then(res => {
                const sortedExams = res.data.sort((a, b) => {
                    if (a.locked === b.locked) return 0;
                    return a.locked ? 1 : -1;
                });
                setExams(sortedExams);
            })
            .catch(err => console.log(err))
    }, []);

    const handleClick = (exam) => {
        if (exam.locked && user?.account !== 'VIP') {
            setMessage('Đề thi này chỉ dành cho tài khoản VIP. Vui lòng');
            return;
        }
        setMessage(''); 
        navigate("/practice/detail", {
            state: { examId: exam.examId }
        })
    }

    return (
        <div className={styles.practice}>
            <div className='container'>
                {message && (
                    <div className={styles.noti}>
                        {message}
                        {' '}
                        <a href='#'>
                        nâng cấp tài khoản 
                        </a>
                        {' '}
                        để truy cập.
                    </div>
                )}
                <div className={styles.accountType}>
                    Tài khoản của bạn là: <span>{user?.account}</span>
                </div>
                <div className={styles.wrapp}>
                    <div className='row'>
                        {exams.map(exam => (
                            <div key={exam.examId} className='col-lg-2 col-6 mb-5'> 
                                <div 
                                  className={exam.locked && user?.account !== 'VIP' ? `${styles.locked}` : `${styles.unlocked}`}
                                  onClick={() => handleClick(exam)}
                                >
                                    {exam.locked && user?.account !== 'VIP' && 
                                    <svg className={styles.lock} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4 6V4C4 1.79086 5.79086 0 8 0C10.2091 0 12 1.79086 12 4V6H14V16H2V6H4ZM6 4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4V6H6V4ZM7 13V9H9V13H7Z" fill="#000000"/>
                                    </svg>                                  
                                    } 
                                    <div className={styles.wrapper}>
                                        <div className={styles.wrap}>
                                            <div className={styles.title}>{exam.examName}</div>
                                            <div className={styles.infor}>
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"/>
                                                </svg>
                                                <span>90 phút |</span>
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"/>
                                                    <path d="M19.2101 15.74L15.67 19.2801C15.53 19.4201 15.4 19.68 15.37 19.87L15.18 21.22C15.11 21.71 15.45 22.05 15.94 21.98L17.29 21.79C17.48 21.76 17.75 21.63 17.88 21.49L21.42 17.95C22.03 17.34 22.32 16.63 21.42 15.73C20.53 14.84 19.8201 15.13 19.2101 15.74Z"/>
                                                    <path d="M18.7001 16.25C19.0001 17.33 19.84 18.17 20.92 18.47"/>
                                                    <path d="M3.40991 22C3.40991 18.13 7.25994 15 11.9999 15C13.0399 15 14.0399 15.15 14.9699 15.43"/>
                                                </svg>
                                                <span>{exam.attemptCount}</span>
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
    )
}

export default PracticeExam;
