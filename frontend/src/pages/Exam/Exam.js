import { Link, useNavigate } from "react-router-dom";
import styles from './Exam.module.css';
import axios from "axios";
import { useEffect, useState } from "react";

function Exam() {
    const API = process.env.REACT_APP_API_URL;
    const [exams, setExams] = useState([]);
    const [allExams, setAllExams] = useState([]);
    const [text, setText] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${API}/exams`)
            .then(res => {
                setExams(res.data);
                console.log(res.data)
                setAllExams(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleInput = (value) => {
        setText(value);
        const filtered = allExams.filter(exam =>
            exam.examName.toLowerCase().includes(value.toLowerCase())
        );
        setExams(filtered);
    };

    const handleSort = (field) => {
        let newOrder = 'asc';
        if (field === sortField) {
            newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        }

        setSortField(field);
        setSortOrder(newOrder);

        const sorted = sortExams(exams, field, newOrder);
        setExams(sorted);
    };

    const sortExams = (list, field, order) => {
        return list.sort((a, b) => {
            let aValue = a[field];
            let bValue = b[field];

            if (field === 'createdAt') {
                aValue = parseDate(aValue);
                bValue = parseDate(bValue);
            } else {
                aValue = aValue?.toLowerCase?.() || '';
                bValue = bValue?.toLowerCase?.() || '';
            }

            if (aValue < bValue) return order === 'asc' ? -1 : 1;
            if (aValue > bValue) return order === 'asc' ? 1 : -1;
            return 0;
        });
    };

    function parseDate(str) {
        const [day, month, yearAndTime] = str.split('-');
        const [year, time] = yearAndTime.split(' ');
        const [hour, minute, second] = time.split(':');
        return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour}:${minute}:${second}`);
    }

    const renderSortIcon = (field) => {
        if (sortField !== field) return '';
        return sortOrder === 'asc' ? ' ▲' : ' ▼';
    };

    const handleRowClick = (value) => {
        navigate("/exam/details", {
          state: { examId: value },
        });
    };

    return (
        <div className={styles.exam}>
            <div className="container">
                <div className={`row ${styles.toolBar}`}>
                    <div className="col-12 col-md-4">
                        <input
                            className={styles.input}
                            value={text}
                            onChange={(e) => handleInput(e.target.value)}
                            placeholder="Tìm kiếm đề"
                        />
                    </div>
                    <div className="col-12 col-md-5">
                        <div className={styles.sort}>Sắp xếp theo:</div>
                        <div className={styles.sortList}>
                            <button className={styles.sortBtn} onClick={() => handleSort('examName')}>
                                Tên đề{renderSortIcon('examName')}
                            </button>
                            <button className={styles.sortBtn} onClick={() => handleSort('createdBy')}>
                                Người tạo{renderSortIcon('createdBy')}
                            </button>
                            <button className={styles.sortBtn} onClick={() => handleSort('createdAt')}>
                                Thời gian tạo{renderSortIcon('createdAt')}
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-md-3 d-flex justify-content-center justify-content-md-end">
                        <Link to="/exam/new_exam">
                            <button className={styles.addBtn}>
                                Thêm đề mới
                            </button>
                        </Link>
                    </div>
                </div>
                <div className={`row ${styles.detail}`}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Tên đề</th>
                                <th className={styles.th}>Người tạo</th>
                                <th className={styles.th}>Thời gian tạo</th>
                                <th className={styles.th}>Cập nhật lần cuối</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams.map(exam => (
                                <tr key={exam.examId}>
                                    <td className={styles.td} onClick={() => handleRowClick(exam.examId)}>
                                        {exam.examName}
                                    </td>
                                    <td className={styles.td}>{exam.createdBy}</td>
                                    <td className={styles.td}>{exam.createdAt}</td>
                                    <td className={styles.td}>{exam.updatedAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Exam;
