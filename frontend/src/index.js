import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MainLayout from "./layouts/MainLayout/MainLayout";
import InforLayout from "./layouts/InforLayout/InforLayout";
import Home from "./pages/Home/Home";
import { AuthProvider } from "./contexts/AuthContext";
import Infor from "./pages/Infor/Infor";
import ExamHistory from "./pages/ExamPage/ExamHistory/ExamHistory"
import Exam from "./pages/ExamPage/Exam/Exam";
import CreateExam from "./pages/ExamPage/CreateExam/CreateExam";
import ExamLayout from "./layouts/ExamLayout/ExamLayout";
import NewExam from "./pages/ExamPage/Exam/NewExam";
import ExamDetails from "./pages/ExamPage/ExamDetails/ExamDetails";
import { useAuth } from "./hooks/useAuth";
import { Navigate } from "react-router-dom";
import ManageQuestion from "./pages/ExamPage/ManageQuestion/ManageQuestion";
import PracticeExam from "./pages/PracticePage/PracticeExam/PracticeExam";
import PracticeLayout from "./layouts/PracticeLayout/PracticeLayout";
import PracticeDetail from "./pages/PracticePage/PracticeDetail/PracticeDetail";
import PracticeTest from "./pages/PracticePage/PracticeTest/PracticeTest";
import PracticeReview from "./pages/PracticePage/PracticeReview/PracticeReview";
import PaymentLayout from "./layouts/PaymentLayout/PaymentLayout";
import Payment from "./pages/Payment/Payment";

const RequireAuth = ({ children }) => {
  const { user, isLoadingUser } = useAuth();

  if (isLoadingUser) {
    return <div>Đang tải dữ liệu người dùng...</div>;
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
};


const RequireAdmin = ({ children }) => {
  const { user, isLoadingUser } = useAuth();

  if (isLoadingUser) {
    return <div>Đang tải dữ liệu người dùng...</div>;
  }

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return children;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover={false}
          draggable
          style={{
            fontSize: '1.6rem'
          }}
        />
        <Routes>
          {/* Các trang Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* Các trang yêu cầu ĐĂNG NHẬP */}
          <Route element={<RequireAuth> <ExamLayout /> </RequireAuth>}>
            <Route path="/exam" element={<Exam />} />
            <Route path="/exam/new_exam" element={<NewExam />} />
            <Route path="/exam/details" element={<ExamDetails />} />
          </Route>

          <Route path="/exam/details/manage_ques" element={<RequireAuth><RequireAdmin><ManageQuestion /></RequireAdmin></RequireAuth>} />
          <Route path="/exam/create" element={<RequireAuth><RequireAdmin><CreateExam /></RequireAdmin></RequireAuth>} />

          <Route element={<RequireAuth><PracticeLayout /></RequireAuth>}>
            <Route path="/practice" element={<PracticeExam />} />
            <Route path="/practice/detail" element={<PracticeDetail />} />
            <Route path="/practice/test" element={<PracticeTest />} />
            <Route path="/practice/review" element={<PracticeReview />} />
          </Route>

          <Route path="/user" element={<RequireAuth><InforLayout /></RequireAuth>}>
            <Route path="infor" element={<Infor />} />
            <Route path="history" element={<ExamHistory />} />
          </Route>

          {/* Nếu mở Payment thì cũng bọc luôn */}
          {/* <Route element={<RequireAuth><PaymentLayout /></RequireAuth>}>
    <Route path="/payment" element={<Payment />} />
  </Route> */}
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
