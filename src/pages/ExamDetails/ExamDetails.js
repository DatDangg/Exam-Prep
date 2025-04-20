import styles from './ExamDetails.module.css'
import { useLocation } from "react-router-dom";

function ExamDetails() {
    const location = useLocation();
    const examName = location.state?.examName || "Đề không tên";

    console.log("Tên đề:", examName);

    return (
        <div>hihi</div>
    )
}

export default ExamDetails