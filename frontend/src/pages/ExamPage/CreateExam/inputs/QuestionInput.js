import React from "react";
import ImageUpload from "./ImageUpload";
import LatexPreview from "../preview/LatexPreview"

import styles from './QuestionInput.module.css'

function QuestionInput({ ques, onChange }) {
  return (
    <div className={styles.questionInput}>
      <div className={styles.wrapper}>
        <textarea
          id="ques-input"
          onChange={(e) => onChange(e.target.value)}
          value={ques}
          className={styles.input}
          placeholder="Ví dụ: Giải phương trình $$x^2 + 2x + 1 = 0$$"
        />
        <div className={styles.preview}>
          <LatexPreview text={ques} />
        </div>
      </div>
      <ImageUpload
  target="ques"
  onInsertImage={(markdown) => {
    const textarea = document.getElementById("ques-input");
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const updated = ques.slice(0, start) + markdown + ques.slice(end);
    onChange(updated);
  }}
/>


    </div>
  );
}

export default QuestionInput;