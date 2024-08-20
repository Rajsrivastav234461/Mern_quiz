import React, { useState } from "react";
import styles from "../componentsStyles/Taketest.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Taketest() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submithandler = (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Please fill in all fields.");
      return;
    }

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("/api/test/", { name, email }, options)
      .then((res) => {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        console.log("Request successful:", res.data);
        // Redirect to the test page directly
        navigate('/test');
      })
      .catch((err) => {
        if (err.response) {
          console.error("Error response data:", err.response.data);
          console.error("Error response status:", err.response.status);
          alert(`Error: ${err.response.data.message || "An error occurred."}`);
        } else {
          console.error("Error message:", err.message);
          alert(`Error: ${err.message || "An error occurred."}`);
        }
      });
  };

  return (
    <div className={styles.parent}>
      <div className={styles.taketest}>
        <h1 className={styles.heading}>Take Test</h1>
        <br />
        <form onSubmit={submithandler}>
          <label className={styles.labels} htmlFor="name">
            Name:
          </label>
          <input
            className={styles.inputs}
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="name"
            type="text"
            value={name}
          />
          <br />
          <label className={styles.labels} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.inputs}
            id="email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <button type="submit" className={styles.buttons}>
            Submit
          </button>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
}

export default Taketest;
