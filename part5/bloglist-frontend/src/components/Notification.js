import React from "react";
import "./notification_style.css";

const Notification = ({ message, type }) => (
  <div className={type}>
    <p>{message}</p>
  </div>
);

export default Notification;
