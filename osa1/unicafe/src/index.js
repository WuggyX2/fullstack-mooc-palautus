import React, { useState } from "react";
import ReactDOM from "react-dom";
import Statistics from "./components/Statistics";
import Button from "./components/Button";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const setToGood = () => {
    const goodAmount = good + 1;
    const allAmount = all + 1;
    setGood(goodAmount);
    setAll(allAmount);
    setAverage((goodAmount + bad * -1) / allAmount);
    setPositive((goodAmount / allAmount) * 100);
  };

  const setToNeutral = () => {
    const allAmount = all + 1;
    setNeutral(neutral + 1);
    setAll(allAmount);
    setAverage((good + bad * -1) / allAmount);
    setPositive((good / allAmount) * 100);
  };

  const setToBad = () => {
    const badAmount = bad + 1;
    const allAmount = all + 1;
    setBad(badAmount);
    setAll(allAmount);
    setAverage((good + badAmount * -1) / allAmount);
    setPositive((good / allAmount) * 100);
  };

  const statisticsProps = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average,
    positive: positive,
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={setToGood} label="good" />
      <Button handleClick={setToNeutral} label="neutral" />
      <Button handleClick={setToBad} label="bad" />
      <Statistics {...statisticsProps} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
