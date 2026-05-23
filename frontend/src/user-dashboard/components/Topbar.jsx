import React from "react";

const Topbar = () => {
  return (
    <div className="topbar">
      <div>
        <h1>Dashboard</h1>
        <p>Thursday, May 21, 2026</p>
      </div>

      <div className="profile-box">
        <div>
          <h4>john.doe@gmail.com</h4>
          <p>Welcome back, John!</p>
        </div>

        <div className="avatar">
          J
        </div>
      </div>
    </div>
  );
};

export default Topbar;