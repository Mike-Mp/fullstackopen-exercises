import React from "react";

const Notification = ({ message }) => {
  return (
    <div>
      <p className="error">{message}</p>
    </div>
  );
};

export default Notification;
