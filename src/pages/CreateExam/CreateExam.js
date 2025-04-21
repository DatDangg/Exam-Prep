import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "./CreateExam.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SelectTypeStep from "./steps/SelectTypeStep";
import QuestionStep from "./steps/QuestionStep";
import PreviewQuestion from "./preview/PreviewQuestion";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function CreateExam() {
  const [questions, setQuestions] = useState([]);
  const [ques, setQues] = useState("");
  const [options, setOptions] = useState({});
  const [answer, setAnswer] = useState({});
  const [explanations, setExplanations] = useState({});
  const [questionType, setQuestionType] = useState("Part_1");
  const [explain, setExplain] = useState("");
  const [count, setCount] = useState([])

  const navigate = useNavigate()
  const location = useLocation();
  const examId = location.state?.examId || "";

  const fetchCount = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/exams/${examId}/detail`);
      setCount(res.data.questionCount);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    fetchCount();
  }, []);
  
  const validateInputs = () => {
    if (ques.trim() === "") return "Câu hỏi không được để trống";
    if (questionType !== "Part_3" && Object.keys(options).length < 4) return "Bạn cần nhập các lựa chọn";
    if (questionType === "Part_2") {
      if (Object.keys(explanations).length < 4) return "Bạn cần nhập giải thích cho từng phần";
      if (Object.keys(answer).length < 4) return "Bạn cần chọn đáp án cho từng phần";
    }
    if (questionType === "Part_3" && Object.keys(answer).length === 0) return "Bạn nhập chọn đáp án đúng";
    if (questionType === "Part_1" && Object.keys(answer).length === 0) return "Bạn cần chọn đáp án đúng";
    if (questionType !== "Part_2" && explain.trim() === "") return "Bạn cần nhập giải thích";
    return null;
  };
  
  const handleAddQuestion = async  () => {
    const error = validateInputs();
    if (error) return toast.error(error, { pauseOnHover: false });


    let newQuestion = {
      type: questionType,
      question: ques,
      explanation: explain,
    };

    if (questionType === "Part_1" || questionType === "Part_2") {
      const labels = ["A", "B", "C", "D"];
      newQuestion.choices = labels.map((label) => ({
        label,
        text: options[label] || "",
        correct: questionType === "Part_1" ? answer.answer === label : answer[label] === "true",
        explain: questionType === "Part_2" ? explanations[label] || "" : "",
      }));
    }

    if (questionType === "Part_3") {
      newQuestion.answer = Object.values(answer).join("");
    }

    try {
      const res = await axios.post(`http://localhost:8080/api/questions/add/${examId}`, newQuestion);
      newQuestion.questionId = res.data.questionId

      setQuestions([...questions, newQuestion]);
      
      await fetchCount(); 

      toast("Lưu câu hỏi thành công", {
        autoClose: 2000,
        className: styles.customToast,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    } catch (err) {
      toast.error("Lỗi khi lưu câu hỏi");
    }
  
    setOptions({});
    setAnswer({});
    setExplanations({});
    setExplain("");
    setQues("");
  };

  const handleOptionChange = (label, value) => {
    setOptions((prev) => ({ ...prev, [label]: value }));
  };

  const handleAnswer = (value, label = "answer") => {
    setAnswer((prev) => ({ ...prev, [label]: value }));
  };

  const handleExplainChange = (label, value) => {
    setExplanations((prev) => ({ ...prev, [label]: value }));
  };

  const handleDigitAnswer = (input) => {
    if (input.length > 4 || /^[A-Za-z]$/.test(input)) return;
    const answerArr = input.split("").slice(0, 4);
    const obj = {};
    answerArr.forEach((char, idx) => {
      obj[idx] = char;
    });
    setAnswer(obj);
  };



  const handleDelete = async (index) => {
    const questionToDelete = questions[index];
    try {
      await axios.delete(`http://localhost:8080/api/questions/${questionToDelete.questionId}`);
      const filtered = questions.filter((_, idx) => idx !== index);
      setQuestions(filtered);
      toast("Đã xoá câu hỏi", {
        autoClose: 2000,
        className: styles.customToast,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    } catch (err) {
      toast.error("Xoá thất bại");
    }
  };

  const handleBack = () => {
    navigate("/exam/details", {
      state: {
          examId: examId  
      }
  });
  }
  
  return (
    <div className={styles.exam}>
      <ToastContainer />
      <div className={styles.header}>
        <button onClick={() => handleBack()} className={styles.backBtn}>Back</button>
        <button onClick={() => handleAddQuestion} className={styles.examBtn}>Lưu và thêm câu hỏi</button>
      </div>
      <div className="container">
        <div className={styles.title}>
          Đề có: <span>{count} câu hỏi</span>
        </div>
        <div className={styles.wrapper}>
          <SelectTypeStep questionType={questionType} onChange={setQuestionType} />
          <QuestionStep
            questionType={questionType}
            ques={ques}
            onQuesChange={setQues}
            options={options}
            onOptionChange={handleOptionChange}
            answer={answer}
            onAnswerChange={handleAnswer}
            explanations={explanations}
            onExplainChange={handleExplainChange}
            explain={explain}
            onExplainTextChange={setExplain}
            onDigitChange={handleDigitAnswer}
          />
          <PreviewQuestion questions={questions} onDelete={handleDelete} type={questionType}/>
        </div>
      </div>
    </div>
  );
}

export default CreateExam;
