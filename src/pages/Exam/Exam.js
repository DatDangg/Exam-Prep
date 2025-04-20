import { Link } from "react-router-dom"
import styles from './Exam.module.css'

function Exam() {
    return (
        <div className={styles.exam}>
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <div>Find</div>
                    </div>
                    <div className="col-md-4">
                        <div>Sort</div>
                    </div>
                    <div className="col-md-3">
                        <button>
                            <Link to="/exam/new_exam">Thêm đề mới</Link>
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Exam