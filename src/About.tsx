import React, { useState } from "react";
import "./App.css";

const About = () => {
  const [show, setShow] = useState(false);

  const handleDelet = () => {
    setShow(true);
    console.log("Show");
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  return (
    <>
      <div>
        {show ? (
          <div className="alert">
            <span className="closebtn" onClick={() => setShow(false)}>
              &times;
            </span>
            <strong>Danger!</strong> Indicates a dangerous or potentially
            negative action.
          </div>
        ) : null}

        <button onClick={handleDelet}>Show</button>
      </div>
    </>
  );
};

export default About;
