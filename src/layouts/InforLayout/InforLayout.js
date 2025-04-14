import { NavLink, Outlet } from "react-router-dom";
import React from "react";

import Header from "../../components/Header/Header";
import styles from "./InforLayout.module.css";
import { useAuth } from "../../hooks/useAuth";

function InforLayout() {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <div className="container">
        <div className={styles.layout}>
          <div className="row">
            <div className={styles.welcome}>Xin chào {user}</div>
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
                  Lịch sử hoạt động
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
