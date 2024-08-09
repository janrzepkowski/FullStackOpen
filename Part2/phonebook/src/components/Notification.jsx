import "../index.css";

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  const notificationStyle = type === "error" ? "error" : "notification";

  return <div className={notificationStyle}>{message}</div>;
};

export default Notification;
