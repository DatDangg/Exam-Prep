import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

import styles from './NewExam.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function NewExam() {
    const { user } = useAuth()
    const [title, setTitle] = useState('')
    const navigate = useNavigate()

    const handleClick = () => {
        axios.post("http://localhost:8080/api/exams/create",
            {
                "examName": title,
                "createdBy": user.userId
            }
        )
        .then(res => {
            navigate("/exam/details", {
                state: { examName: title }
              });
        })
        .catch(err => console.error(err));
    }

    return (
        <div className={styles.newExam}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className={styles.title}>Tạo đề mới</div>

                        <div className={styles.wrapper}>
                            <div className={styles.inputBox}>
                                <label htmlFor="newExam" className={styles.label}>Tên đề</label>
                                <input value={title} id='newExam' className={styles.input} placeholder='Nhập tên đề' onChange={(e) => setTitle(e.target.value)}></input>
                            </div>
                            <button className={styles.button} onClick={() => handleClick()}>Tạo đề</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewExam