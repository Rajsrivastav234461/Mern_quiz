import React, { Fragment, useEffect, useState } from "react";
import styles from "../componentsStyles/Question.module.css";
import TestNav from "./TestNav.component";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Question(props) {
  const navigate = useNavigate();  // Updated to useNavigate

  const res = props.location.state.res;
  const mins = res.time.split(":")[0];
  const secs = (res.time.split(":")[1]) ? res.time.split(":")[1] : 0;
  const length = res.results.length;
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState({});

  const submithandler = () => {
    let name = localStorage.getItem("name");
    let email = localStorage.getItem("email");
    let pin = localStorage.getItem("pin");

    let score = 0;
    for (let i = 0; i < length; i++) {
      if (answers[i] === res.results[i].correct_answer) {
        score += 1;
      }
    }
    score = (score / length) * 100;
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        "/api/test/submittest",
        {
          pin,
          email,
          name,
          score,
        },
        options
      )
      .then((res) => {
        console.log(res);
        navigate("/");  // Updated to use navigate
      })
      .catch((err) => console.log(err));
    console.log(score);
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];  // ES6 swap
    }
    return array;
  }

  useEffect(() => {
    for (let i = 0; i < length; i++) {
      res.results[i].question = res.results[i].question.replace(
        /&#?\w+;/g,
        (match) => entities[match]
      );
      res.results[i].correct_answer = res.results[i].correct_answer.replace(
        /&#?\w+;/g,
        (match) => entities[match]
      );
      res.results[i].incorrect_answers = res.results[
        i
      ].incorrect_answers.map((x) =>
        x.replace(/&#?\w+;/g, (match) => entities[match])
      );
    }
  }, [length, res.results]);

  useEffect(() => {
    setQuestion(res.results[ques].question);
    setOptions([
      res.results[ques].correct_answer,
      ...res.results[ques].incorrect_answers,
    ]);
    setOptions((opts) => shuffleArray(opts));
  }, [ques, res.results]);

  const entities = {
    "&#039;": "'",
    "&quot;": '"',
    "&lt;": "<",
    "&gt;": ">",
    "&#39;": "'",
    "&#34;": "'",
    "&#034;": '"',
    "&#60;": "<",
    "&#060;": "<",
    "&#62;": ">",
    "&#062;": ">",
    "&amp;": "&",
    "&#38;": "&",
    "&#038;": "&",
  };

  const changeclass = (e) => {
    const domele = e.nativeEvent.path;
    domele.reverse();
    let ans = "";
    for (let ele of domele) {
      if (ele.id === "options") {
        for (let ans of ele.childNodes) {
          ans.className = styles.container;
        }
      } else if (ele.localName === "div" && ele.id === "") {
        ele.className = styles.containeractive;
        ans = ele.childNodes[0].value;
      }
    }
    setAnswers({ ...answers, [ques]: ans });
  };

  return (
    <Fragment>
      <TestNav mins={mins} secs={secs} submithandler={submithandler} />
      <div className={styles.qcontainer}>
        {ques + 1}. {question}
      </div>
      <div id="options">
        {options.map((option, index) => (
          <div key={index} className={styles.container} onClick={changeclass}>
            <input
              className={styles.radios}
              type="radio"
              value={option}
              name="options"
              id={index.toString()}
            />
            <label htmlFor={index.toString()}>
              {String.fromCharCode("A".charCodeAt(0) + index)}. {option}
            </label>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <a
          onClick={(e) => {
            if (ques === 0) {
              // Do nothing if at the first question
            } else {
              setQues(ques - 1);
              let answeropt = e.nativeEvent.path[2].childNodes[2].childNodes;
              for (let opt of answeropt) {
                opt.className = styles.container;
              }
            }
          }}
          className={styles.buttons1}
        >
          &#8249;
        </a>
        <a
          onClick={(e) => {
            if (ques === length - 1) {
              // Do nothing if at the last question
            } else {
              setQues(ques + 1);
              let answeropt = e.nativeEvent.path[2].childNodes[2].childNodes;
              for (let opt of answeropt) {
                opt.className = styles.container;
              }
            }
          }}
          className={styles.buttons2}
        >
          &#8250;
        </a>
      </div>
    </Fragment>
  );
}

export default Question;
