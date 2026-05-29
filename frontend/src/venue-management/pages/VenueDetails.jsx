import React from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CapacityOverview from "../components/CapacityOverview";
import "../styles/venueDashboard.css";

const VenueDetails = () => {
  return (
    <div className="venue-dashboard">
      <Sidebar />
      <main className="venue-main">
        <Navbar />
        <div className="venue-content">
          <CapacityOverview />
        </div>
      </main>
    </div>
  );
};

export default VenueDetails;
