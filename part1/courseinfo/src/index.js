import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ course }) => {
  return (
    <>
      <Part part={course.parts[0].name} exercises={course.parts[0].exercises} />
      <Part part={course.parts[1].name} exercises={course.parts[1].exercises} />
      <Part part={course.parts[2].name} exercises={course.parts[2].exercises} />
    </>
  );
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Total = ({ exercises }) => {
  const exercisesSum = exercises.parts.map((obj1) => {
    return obj1.exercises;
  });
  return <p>Number of exercises {exercisesSum.reduce((a, b) => a + b, 0)}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total exercises={course} />
    </div>
  );
};

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        <p>the app is used by pressing the buttons</p>
      </div>
    );
  }

  return (
    <div>
      <p>button press history: {props.allClicks.join(" ")} </p>
    </div>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App2 = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAllClicks] = useState([]);

  const handleLeftClick = () => {
    setAllClicks(allClicks.concat("L"));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAllClicks(allClicks.concat("R"));
    setRight(right + 1);
  };

  return (
    <div>
      <p>{left}</p>
      <Button onClick={handleLeftClick} text="left" />
      <p>{right}</p>
      <Button text={"right"} onClick={handleRightClick} />
      <History allClicks={allClicks} />
    </div>
  );
};

ReactDOM.render(<App2 />, document.getElementById("root"));
