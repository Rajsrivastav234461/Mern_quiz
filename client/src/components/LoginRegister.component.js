import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../componentsStyles/LoginRegister.module.css";
import Login from "./Login.component";
import Register from "./Register.component";

function LoginRegister(props) {
  let navigate = useNavigate();
  
  React.useEffect(() => {
    if (localStorage.getItem("loggedin")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      <Login {...props} />
      <Register />
    </div>
  );
}

export default LoginRegister;
