import React from "react";

import {
  getClientDisplayName,
  getCurrentClient,
} from "../../services/clientSession";

const Topbar = ({ title = "Client Dashboard", subtitle, actions = null }) => {
  const currentClient = getCurrentClient();
  const clientName = getClientDisplayName(currentClient);
  const clientEmail = currentClient.email || "client@example.com";
  const clientPhoto = typeof currentClient.photo === "string" ? currentClient.photo.trim() : "";
  const clientInitial = clientName.trim().charAt(0).toUpperCase() || "C";
  const pageSubtitle = subtitle || `${currentClient.role || "Client"} module`;

  return (
    <div className="topbar">
      <div className="topbar-copy">
        <h1>{title}</h1>
        <p>{pageSubtitle}</p>
      </div>

      <div className="topbar-right">
        {actions ? <div className="topbar-actions">{actions}</div> : null}

        <div className="profile-box">
          <div className="profile-meta">
            <h4>{clientEmail}</h4>
            <p>Welcome back, {clientName}!</p>
          </div>

          <div>
            {clientPhoto ? (
              <div className="avatar avatar-image">
                <img src={clientPhoto} alt={clientName} />
              </div>
            ) : (
              <div className="avatar" aria-label={clientName}>
                {clientInitial}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;