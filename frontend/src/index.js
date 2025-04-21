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
import ExamHistory from "./pages/ExamHistory/ExamHistory";
import Exam from "./pages/Exam/Exam";
import CreateExam from "./pages/CreateExam/CreateExam";
import ExamLayout from "./layouts/ExamLayout/ExamLayout";
import NewExam from "./pages/Exam/NewExam";
import ExamDetails from "./pages/ExamDetails/ExamDetails";
import { useAuth } from "./hooks/useAuth"; 
import { Navigate } from "react-router-dom";
import ManageQuestion from "./pages/ExamDetails/ManageQuestion";

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<RequireAdmin><ExamLayout /></RequireAdmin>}>
            <Route path="/exam" element={<Exam />} />
            <Route path="/exam/new_exam" element={<NewExam />} />
            <Route path="/exam/details" element={<ExamDetails />} />
          </Route>
          <Route path="/exam/details/manage_ques" element={<RequireAdmin><ManageQuestion /></RequireAdmin>} />
          <Route path="/exam/create" element={<RequireAdmin><CreateExam /></RequireAdmin>}/>

          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/user" element={<InforLayout />}>
            <Route path="infor" element={<Infor />} />
            <Route path="history" element={<ExamHistory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
  </React.StrictMode>
);

reportWebVitals();
