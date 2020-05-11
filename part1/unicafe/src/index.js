import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({ value, text }) => {
  return (
    <tr>
      <td>
        {text}
        {value}
      </td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>no feedback was given.</p>
      </div>
    );
  }
  const all = good + neutral + bad;
  const average = good - bad / all;
  const positive = (good / all) * 100 + " %";
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistic value={good} text="Good: " />
          <Statistic value={neutral} text="Neutral: " />
          <Statistic value={bad} text="Bad: " />
          <Statistic value={all} text="All: " />
          <Statistic value={average} text="Average: " />
          <Statistic value={positive} text="Positive: " />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
