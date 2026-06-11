import React from "react";

import {
  getClientDisplayName,
  getClientInitial,
  getCurrentClient,
} from "../../services/clientSession";

const Topbar = () => {
  const currentClient = getCurrentClient();
  const clientName = getClientDisplayName(currentClient);
  const clientEmail = currentClient.email || "client@example.com";
  const clientInitial = getClientInitial(currentClient);

  return (
    <div className="topbar">
      <div>
        <h1>Client Dashboard</h1>
        <p>{currentClient.role || "Client"} module</p>
      </div>

      <div className="profile-box">
        <div>
          <h4>{clientEmail}</h4>
          <p>Welcome back, {clientName}!</p>
        </div>

        <div className="avatar">
          {clientInitial}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
