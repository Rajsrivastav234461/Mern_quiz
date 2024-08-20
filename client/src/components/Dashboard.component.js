import React, { useState, useEffect, Fragment } from "react";
import Test from "./TestElement.component";
import styles from "../componentsStyles/Dashboard.module.css";
import axios from "axios";
import Modal from "react-modal";
import modalstyles from "../componentsStyles/Modal.module.css";
import teststyles from "../componentsStyles/Testelement.module.css";
import { useNavigate } from "react-router-dom";
import resultstyles from "../componentsStyles/TestResult.module.css";

const topics = [
  { id: 1, name: "<--select category-->" },
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
  { id: 11, name: "Entertainment: Film" },
  { id: 12, name: "Entertainment: Music" },
  { id: 13, name: "Entertainment: Musicals & Theatres" },
  { id: 14, name: "Entertainment: Television" },
  { id: 15, name: "Entertainment: Video Games" },
  { id: 16, name: "Entertainment: Board Games" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Science: Computers" },
  { id: 19, name: "Science: Mathematics" },
  { id: 20, name: "Mythology" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 24, name: "Politics" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
  { id: 29, name: "Entertainment: Comics" },
  { id: 30, name: "Science: Gadgets" },
  { id: 31, name: "Entertainment: Japanese Anime & Manga" },
  { id: 32, name: "Entertainment: Cartoon & Animations" },
];

Modal.setAppElement("#root");

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      localStorage.clear();
      navigate("/");
    }
  }, [navigate]);

  const [tests, setTests] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [expiry, setExpiry] = useState("");

  const options = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
  };

  useEffect(() => {
    axios
      .post("/api/test/gettests", {}, options)
      .then((res) => {
        const updatedTests = res.data.map((x) => {
          const topicName = topics.find((y) => y.id === x.topic)?.name || "Unknown";
          return { ...x, topicname: topicName };
        });
        setTests(updatedTests);
      })
      .catch((err) => {
        if (!localStorage.getItem("auth-token")) {
          navigate("/");
        } else {
          alert("Couldn't fetch data. Please reload.");
        }
      });
  }, [modalIsOpen, options, navigate]);

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "/api/test/addtest",
        { topic, amount, time, expiry, created: new Date() },
        options
      )
      .then(() => {
        setModalIsOpen(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding test. Please try again.");
      });
  };

  return (
    <React.Fragment>
      <div>
        <h1
          className={styles.heading}
          style={{ background: "white", fontSize: "2em", padding: "2%" }}
        >
          Welcome {localStorage.getItem("name")}
        </h1>
      </div>
      <button
        className={styles.buttons}
        style={{ float: "left", display: "block" }}
        onClick={() => setModalIsOpen(true)}
      >
        + Add Test
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className={modalstyles.modal}
        overlayClassName={modalstyles.overlay}
      >
        <Fragment>
          <h1 className={modalstyles.heading}>Create Test</h1>
          <form onSubmit={onSubmit}>
            <label className={modalstyles.labels} htmlFor="topic">
              Topic:
            </label>
            <select
              id="topic"
              name="topic"
              className={modalstyles.inputs}
              onChange={(e) => setTopic(e.target.value)}
            >
              {topics.map((obj) => (
                <option key={obj.id} value={obj.id}>
                  {obj.name}
                </option>
              ))}
            </select>
            <br />
            <label className={modalstyles.labels} htmlFor="amount">
              Number of Questions:
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              className={modalstyles.inputs}
              onChange={(e) => setAmount(e.target.value)}
            />
            <br />
            <label className={modalstyles.labels} htmlFor="time">
              Time Duration (Mins):
            </label>
            <input
              type="text"
              id="time"
              name="time"
              className={modalstyles.inputs}
              onChange={(e) => setTime(e.target.value)}
            />
            <br />
            <label className={modalstyles.labels} htmlFor="expiry">
              Expiry:
            </label>
            <input
              type="date"
              id="expiry"
              name="expiry"
              className={modalstyles.inputs}
              onChange={(e) => setExpiry(e.target.value)}
            />
            <br />
            <button className={modalstyles.buttons} type="submit">
              Submit
            </button>
            <br />
          </form>
        </Fragment>
      </Modal>
      <div className={teststyles.parent}>
        <div className={resultstyles.row}>
          <div className={teststyles.element}>
            <strong>Pin</strong>
          </div>
          <div className={teststyles.element}>
            <strong>Topic</strong>
          </div>
          <div className={teststyles.element}>
            <strong>No. of Ques</strong>
          </div>
          <div className={teststyles.element}>
            <strong>Time Duration (Mins)</strong>
          </div>
          <div className={teststyles.element}>
            <strong>Expiry</strong>
          </div>
        </div>
        <div className={styles.testcontainer}>
          {tests.map((obj) => (
            <Test key={obj._id} {...obj} />
          ))}
        </div>
      </div>
      <br />
      <br />
    </React.Fragment>
  );
}

export default Dashboard;
