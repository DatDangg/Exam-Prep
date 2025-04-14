import axios from 'axios'
import styles from './Infor.module.css'
import { useAuth } from '../../hooks/useAuth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Infor() {
    const { user, isAuthenticated } = useAuth()
    const [infor, setInfor] = useState({})
    const navigate = useNavigate()
    const [name, setName] = useState(`${user?.username}`)
    const [email, setEmail] = useState(`${user?.email}`)
    const [phone, setPhone] = useState(`${infor?.phoneNumber}`)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
        else {
            axios.get(`http://localhost:3001/userInfor/${user.id}`)
            .then(res => {
                setInfor(res.data)
                setPhone(res.data.phoneNumber || '')
            })
            .catch(err => console.error(err));
        }
    },[])

    const handleNameChange = (value) => {
        setName(value)
    }
    const handleEmailChange = (value) => {
        setEmail(value)
    }
    const handlePhoneChange = (value) => {
        setPhone(value)
    }
    const changeInfor = async () => {
        try {
            await Promise.all([
                axios.put(`http://localhost:3001/users/${user.id}`, {
                    ...user,
                    username: name,
                    email: email
                }),
                axios.put(`http://localhost:3001/userInfor/${user.id}`, {
                    ...infor,
                    phoneNumber: phone
                })
            ]);
            toast.success("Cập nhật thông tin thành công")
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
            toast.error("Có lỗi xảy ra")
        }
    };
    
    return (
        <div className={styles.infor}>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <div className={styles.wrapper}>
                            <label className={styles.label}>Họ tên</label>
                            <input onChange={(e) => handleNameChange(e.target.value)} value={name} className={styles.input}></input>
                        </div>
                        <div className={styles.wrapper}>
                            <label className={styles.label}>Địa chỉ email</label>
                            <input onChange={(e) => handleEmailChange(e.target.value)} value={email} className={styles.input}></input>
                        </div>
                        <div className={styles.wrapper}>
                            <label className={styles.label}>Số điện thoại</label>
                            <input onChange={(e) => handlePhoneChange(e.target.value)} value={phone} className={styles.input}></input>
                        </div>
                        <button onClick={() => changeInfor()} className={styles.btn}>
                            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="transparent">
                                <path
                                fill="currentColor"
                                d="M15.198 3.52a1.612 1.612 0 012.223 2.336L6.346 16.421l-2.854.375 1.17-3.272L15.197 3.521zm3.725-1.322a3.612 3.612 0 00-5.102-.128L3.11 12.238a1 1 0 00-.253.388l-1.8 5.037a1 1 0 001.072 1.328l4.8-.63a1 1 0 00.56-.267L18.8 7.304a3.612 3.612 0 00.122-5.106zM12 17a1 1 0 100 2h6a1 1 0 100-2h-6z"
                                />
                            </svg>
                            Cập nhật thông tin
                        </button>
                    </div>
                    <div className={`col-12 col-md-5 offset-md-1 ${styles.userInfor}`}>
                        <div className={styles.inforList}>
                            <div className={styles.inforTitle}>Tài khoản</div>
                            <div className={styles.inforValue}>{infor?.id}</div>
                        </div>
                        <div className={styles.inforList}>
                            <div className={styles.inforTitle}>Loại tài khoản</div>
                            <div className={styles.inforValue}>{infor?.accountType}</div>
                        </div>
                        <div className={styles.inforList}>
                            <div className={styles.inforTitle}>Ngày tạo</div>
                            <div className={styles.inforValue}>{infor?.creationDate}</div>
                        </div>
                        <div className={styles.inforList}>
                            <div className={styles.inforTitle}>Số lượt đã thi</div>
                            <div className={styles.inforValue}>{infor?.examCount}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}   

export default Infor