import { NavLink, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

import Header from "../../components/Header/Header";
import styles from "./InforLayout.module.css";
import { useAuth } from "../../hooks/useAuth";

function InforLayout() {
  const { user, isAuthenticated, isLoadingUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingUser && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoadingUser, navigate]);  

  if (isLoadingUser) {
    return <div>Đang tải thông tin người dùng...</div>;
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className={styles.layout}>
          <div className="row">
            <div className={styles.welcome}>Xin chào {user?.username}</div>
            <ul className={styles.navbar}>
              <li className={styles.navbarItem}>
                <NavLink
                  to="infor"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.activeLink} ${styles.navbarLink}`
                      : styles.navbarLink
                  }
                >
                  Thông tin cá nhân
                </NavLink>
              </li>
              <li className={styles.navbarItem}>
                <NavLink
                  to="history"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.activeLink} ${styles.navbarLink}`
                      : styles.navbarLink
                  }
                >
                  Lịch sử thi
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="row">
            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InforLayout;
