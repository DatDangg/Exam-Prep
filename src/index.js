import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import MainLayout from "./layouts/MainLayout/MainLayout";
import InforLayout from "./layouts/InforLayout/InforLayout";
import Home from "./Page/Home/Home";
import { AuthProvider } from "./contexts/AuthContext";
import Infor from "./Page/Infor/Infor";
import ExamHistory from "./Page/ExamHistory/ExamHistory";

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
          pauseOnHover
          draggable
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
