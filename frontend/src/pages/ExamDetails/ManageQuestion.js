import { useEffect, useState } from 'react'
import styles from './ManageQuestion.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import QuestionPreviewCard from '../CreateExam/preview/QuestionPreviewCard';
import LatexPreview from '../CreateExam/preview/LatexPreview';

function ManageQuestion() {
  const API = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const examId = location.state?.examId || "";
  const [questions, setQuestions] = useState([])
  const [count, setCount] = useState()
  const [isExpanded, setIsExpanded] = useState([])

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const res = await axios.get(`${API}/exams/${examId}/detail`);
        setQuestions(res.data.questions);
        setCount(res.data.questionCount);
      } catch (err) {
        console.log(err);
      }
    };

    if (examId) fetchExamData();
  }, [examId]);

  const handleDelete = async (index) => {
    const questionToDelete = questions[index];
    try {
      await axios.delete(`${API}/questions/${questionToDelete.questionId}`);
      const filtered = questions.filter((_, idx) => idx !== index);
      setQuestions(filtered);

      const res = await axios.get(`${API}/exams/${examId}/detail`);
      setCount(res.data.questionCount);

      toast("Đã xoá câu hỏi");
    } catch (err) {
      toast.error("Xoá thất bại");
    }
  };

  const navigate = useNavigate();

  const handleUpdate = (index) => {
    const editQues = questions[index];
    navigate("/exam/create", {
      state: {
        examId,
        editQues,
      },
    });
  };

  const handleBack = () => {
    navigate("/exam/details", {
      state: {
        examId: examId
      }
    });
  }

  const handleAdd = () => {
    navigate("/exam/create", {
        state: { examId: examId },
    });
  } 

  const handleToggle = (id) => {
    setIsExpanded(prev => (
      isExpanded.includes(id) ?
        isExpanded.filter((prev)=> prev !== id)
        :
        [...prev, id]
    ))
  }

  const handleToggleAll = () => {
    if (isExpanded.length === questions.length) setIsExpanded([])
    else setIsExpanded(() => questions.map((q, idx) => idx))
    
  }

  return (
    <div className={styles.manage}>
      <div className={styles.header}>
        <button onClick={handleBack} className={styles.backBtn}>Quay lại</button>
        <button onClick={handleAdd} className={styles.addBtn}>Thêm câu hỏi</button>
      </div>
      <div className={styles.content}>
        <div className='container'>
          <div className='row'>
            <div className={styles.title}>
              <div onClick={() => handleToggleAll()} className={styles.expandBtn}>
                <svg width='1rem' height='1rem' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 10L21 3M21 3H16.5M21 3V7.5M10 14L3 21M3 21H7.5M3 21L3 16.5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.count}>Đề có {count} câu</div>
            </div>
            {questions.map((ques, id) => (
              <div key={id} className={styles.wrapper}>
                <div className={styles.title1}>
                  <div onClick={() => handleToggle(id)} className={styles.expandBtn1}>
                    <svg width='1rem' height='1rem' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 10L21 3M21 3H16.5M21 3V7.5M10 14L3 21M3 21H7.5M3 21L3 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={styles.ques}>Câu {id + 1}:</div>
                </div>
                <div className={styles.question}>
                  Câu hỏi: <LatexPreview text={ques.question} />
                </div>
                <div
                  className={`${styles.expandWrapper} ${isExpanded.includes(id) ? styles.open : ''}`}
                >
                  <QuestionPreviewCard
                    question={ques}
                    onDelete={() => handleDelete(id)}
                    onUpdate={() => handleUpdate(id)}
                    state={"update"}
                  />
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageQuestion