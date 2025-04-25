import ImageUpload from "./ImageUpload";
import LatexPreview from "../preview/LatexPreview";
import styles from "./ExplainInput.module.css";

function ExplainInput({ explain, onChange }) {
  const handleInsertImage = (markdown) => {
    const textarea = document.getElementById("explain-input");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const updated = explain.slice(0, start) + markdown + explain.slice(end);
    onChange(updated);
  };

  return (
    <div className={styles.explainInput}>
      <div className={styles.wrapper}>
        <textarea
          id="explain-input"
          value={explain}
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
          placeholder="Viết giải thích ở đây (có thể chèn ảnh hoặc công thức)"
        />
        <div className={styles.preview}>
          <LatexPreview text={explain} />
        </div>
      </div>
      <ImageUpload target="explain" onInsertImage={handleInsertImage} />
    </div>
  );
}

export default ExplainInput;
