import React from "react";
import styles from "../CreateExam.module.css";
import QuestionInput from "../inputs/QuestionInput";
import ExplainInput from "../inputs/ExplainInput";
import OptionInputList from "../inputs/OptionInputList";
import AnswerInput from "../inputs/AnswerInput";

function QuestionStep({
  questionType,
  ques,
  onQuesChange,
  options,
  onOptionChange,
  answer,
  onAnswerChange,
  explanations,
  onExplainChange,
  explain,
  onExplainTextChange,
  onDigitChange,
}) {
  return (
    <>
      <div className="row">
        <div className="col-md-1 d-flex justify-content-end">
          <div className={styles.titleCount}>2</div>
        </div>
        <div className="col-md-11 mb-3">
          <div className={styles.titleName}>Nhập câu hỏi</div>
          <div className={styles.titleDesc}>Chỉ viết câu hỏi ở đây, không viết câu trả lời</div>
          <div className={styles.partContent}>
            <div className={styles.questionInput}>
              <QuestionInput ques={ques} onChange={onQuesChange} />
            </div>
          </div>
        </div>
      </div>

      {(questionType === "Part_1" || questionType === "Part_2") && (
        <div className="row">
          <div className="col-md-1 d-flex justify-content-end">
            <div className={styles.titleCount}>3</div>
          </div>
          <div className="col-md-11 mb-3">
            <div className={styles.titleName}>Nhập lựa chọn</div>
            <div className={styles.titleDesc}>Nhập các lựa chọn tương ứng cho câu hỏi</div>
            <div className={styles.partContent}>
              <OptionInputList
                type={questionType}
                options={options}
                answer={answer}
                onOptionChange={onOptionChange}
                onAnswerChange={onAnswerChange}
                explanations={explanations}
                onExplainChange={onExplainChange}
              />
            </div>
          </div>
        </div>
      )}

      {questionType === "Part_3" && (
        <div className="row">
          <div className="col-md-1 d-flex justify-content-end">
            <div className={styles.titleCount}>3</div>
          </div>
          <div className="col-md-11 mb-3">
            <div className={styles.titleName}>Nhập đáp án</div>
            <div className={styles.titleDesc}>Đáp án chỉ có 4 ký tự gồm số 0-9 | dấu , | dấu -</div>
            <div className={styles.partContent}>
              <AnswerInput type={questionType} answer={answer} onDigitChange={onDigitChange} />
            </div>
          </div>
        </div>
      )}

      {(questionType === "Part_1" || questionType === "Part_3") && (
        <div className="row">
          <div className="col-md-1 d-flex justify-content-end">
            <div className={styles.titleCount}>4</div>
          </div>
          <div className="col-md-11 mb-3">
            <div className={styles.titleName}>Nhập giải thích</div>
            <div className={styles.titleDesc}>Viết giải thích cho đáp án trên</div>
            <div className={styles.partContent}>
              <div className={styles.explain}>
                <ExplainInput explain={explain} onChange={onExplainTextChange} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuestionStep;