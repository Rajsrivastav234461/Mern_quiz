import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Updated import
import axios from "axios";

function Timer(props) {
  const [allsecs, setallsecs] = useState(
    parseInt(props.mins) * 60 + parseInt(props.secs)
  );
  const [mins, setmins] = useState(props.mins);
  const [secs, setsecs] = useState(props.secs);
  const [helper, sethelper] = useState(null);
  const navigate = useNavigate(); // Updated to useNavigate

  const handle = () => {
    setallsecs((prevSecs) => prevSecs - 1);
    if (allsecs === 1) props.submithandler();
    else {
      let altmins = Math.floor(allsecs / 60).toString();
      if (altmins.length === 1) altmins = "0" + altmins;
      let altsecs = (allsecs % 60).toString();
      if (altsecs.length === 1) altsecs = "0" + altsecs;
      setmins(altmins);
      setsecs(altsecs);
    }
  };

  useEffect(() => {
    let altmins = Math.floor(allsecs / 60).toString();
    if (altmins.length === 1) altmins = "0" + altmins;
    let altsecs = (allsecs % 60).toString();
    if (altsecs.length === 1) altsecs = "0" + altsecs;
    setmins(altmins);
    setsecs(altsecs);
    
    // Cleanup function to handle page reload
    return () => {
      if (window.performance && performance.navigation.type === 1) {
        alert('Reload detected, submitting the test');
        props.submithandler();
      }
    };
  }, [allsecs, props]);

  useEffect(() => {
    sethelper(setInterval(handle, 1000));
    return () => {
      if (helper) clearInterval(helper);
    };
  }, [helper]);

  return (
    <div
      style={{
        justifyContent: "space-around",
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <div
        style={{
          background: "rgb(26, 26, 26, 0.5)",
          color: "white",
          padding: "2% 2% 2% 2%",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ fontSize: "2.5em" }}>{mins}</h1>
      </div>
      <div
        style={{
          background: "rgb(26, 26, 26, 0.5)",
          color: "white",
          padding: "2% 2% 2% 2%",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ fontSize: "2.5em" }}>:</h1>
      </div>
      <div
        style={{
          background: "rgb(26, 26, 26, 0.5)",
          color: "white",
          padding: "2% 2% 2% 2%",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ fontSize: "2.5em" }}>{secs}</h1>
      </div>
    </div>
  );
}

export default Timer;
