import React from "react";
import "./UserHistory.css";

const UserHistory = ({ history }) => {
  return (
    <div className="historymain">
      <h1>Search History</h1>
      <ul>
        {history.map((city, index) => (
          <li key={index}>{city}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserHistory;
