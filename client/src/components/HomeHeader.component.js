// Header.js
import React from "react";
import styles from "../componentsStyles/Header.module.css";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  let location = useLocation();
  const { loggedIn, setLoggedIn } = useAuth();

  React.useEffect(() => {
    if (localStorage.getItem("loggedin")) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  return (
    <div className={styles.header}>
      <div className={styles.navitems}>
        <div className={styles.logo}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            {" "}
            HOME{" "}
          </Link>
        </div>
        <div className={styles.navlinks2}>
          {location.pathname === "/login" ||
          location.pathname === "/register" ? (
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Take Test
            </Link>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              Register/Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
