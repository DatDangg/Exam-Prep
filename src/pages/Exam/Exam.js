import Header from "../../components/Header/Header"
import styles from './Exam.module.css'

function Exam() {
    return (
        <>
        <Header />
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
                        <button>Thêm đề mới</button>
                    </div>
                </div>
                
            </div>
        </div>
        </>
    )
}

export default Exam