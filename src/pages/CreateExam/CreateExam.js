import React, { useEffect, useState } from "react";
import styles from "./CreateExam.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SelectTypeStep from "./steps/SelectTypeStep";
import QuestionStep from "./steps/QuestionStep";
import PreviewQuestion from "./preview/PreviewQuestion";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { validateQuestionInput } from "../../utils/validateQuestion";

function CreateExam() {
  const [questions, setQuestions] = useState([]);
  const [ques, setQues] = useState("");
  const [options, setOptions] = useState({});
  const [answer, setAnswer] = useState({});
  const [explanations, setExplanations] = useState({});
  const [questionType, setQuestionType] = useState("Part_1");
  const [explain, setExplain] = useState("");
  const [count, setCount] = useState()

  const navigate = useNavigate()
  const location = useLocation();
  const examId = location.state?.examId || "";
  const editQues = location.state?.editQues;

  useEffect(() => {
    if (editQues) {
      setQuestionType(editQues.type || "Part_1");
      setQues(editQues.question || "");
      setExplain(editQues.explanation || "");

      if (editQues.choices) {
        const opts = {};
        const ans = {};
        const expl = {};
        editQues.choices.forEach((choice) => {
          opts[choice.label] = choice.text;
          ans[choice.label] = choice.correct ? "true" : "false";
          expl[choice.label] = choice.explain || "";
        });
        setOptions(opts);
        setAnswer(ans);
        setExplanations(expl);
      }

      if (editQues.type === "Part_3" && editQues.answer) {
        const obj = {};
        editQues.answer.split("").forEach((char, idx) => {
          obj[idx] = char;
        });
        setAnswer(obj);
      }
    }
  }, []);

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

  const handleAddQuestion = async () => {
    const error = validateQuestionInput({ ques, questionType, options, answer, explanations, explain, });
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
      if (editQues && editQues.questionId) {
        await axios.put(`http://localhost:8080/api/questions/${editQues.questionId}`, newQuestion);
        toast("Cập nhật câu hỏi thành công");
        navigate("/exam/details/manage_ques", {
          state: {
            examId: examId
          }
        });
      } else {
        const res = await axios.post(`http://localhost:8080/api/questions/add/${examId}`, newQuestion);
        newQuestion.questionId = res.data.questionId;
        setQuestions([...questions, newQuestion]);
        toast("Lưu câu hỏi thành công");
      }

      await fetchCount();
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
    console.log(index)
    try {
      await axios.delete(`http://localhost:8080/api/questions/${questionToDelete.questionId}`);
      const filtered = questions.filter((_, idx) => idx !== index);
      setQuestions(filtered);
      await fetchCount();
      toast("Đã xoá câu hỏi");
    } catch (err) {
      toast.error("Xoá thất bại");
    }
  };

  const handleBack = () => {
    if (location.state?.editQues) {
      navigate("/exam/details/manage_ques", {
        state: {
          examId: examId
        }
      });
    }
    else {
      navigate("/exam/details", {
        state: {
          examId: examId
        }
      });
    }
  }

  return (
    <div className={styles.exam}>
      <div className={styles.header}>
        <button onClick={handleBack} className={styles.backBtn}>Quay lại</button>
        <button onClick={handleAddQuestion} className={styles.examBtn} >
          {location.state?.editQues ? "Cập nhật câu hỏi" : "Lưu và thêm câu hỏi"}
        </button>
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
          <PreviewQuestion questions={questions} onDelete={handleDelete} type={questionType} />
        </div>
      </div>
    </div>
  );
}

export default CreateExam;
