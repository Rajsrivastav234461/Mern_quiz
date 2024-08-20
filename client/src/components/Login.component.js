import React, { useState } from "react";
import axios from "axios";
import styles from "../componentsStyles/LoginRegister.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/user/login", { email, password }, options);
      localStorage.setItem("loggedin", "true");
      localStorage.setItem("auth-token", res.headers["auth-token"]);
      localStorage.setItem("name", res.data.name);
      setLoggedIn(true);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        alert("Invalid email or password.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.parent}>
      <div className={styles.child}>
        <h1 className={styles.heading}>Login</h1>
        <form onSubmit={onSubmit}>
          <label className={styles.labels} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.inputs}
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label className={styles.labels} htmlFor="password">
            Password:
          </label>
          <input
            className={styles.inputs}
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit" className={styles.buttons}>
            Login
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}

export default Login;
