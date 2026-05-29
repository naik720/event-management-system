import React from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AvailableVenuesTable from "../components/AvailableVenuesTable";
import "../styles/venueDashboard.css";

const AllVenues = () => {
  return (
    <div className="venue-dashboard">
      <Sidebar />
      <main className="venue-main">
        <Navbar />
        <div className="venue-content">
          <AvailableVenuesTable />
        </div>
      </main>
    </div>
  );
};

export default AllVenues;
