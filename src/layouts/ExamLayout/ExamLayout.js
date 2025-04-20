import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

function ExamLayout() {
    return(
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default ExamLayout