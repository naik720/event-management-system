import React from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MaintenanceTable from "../components/MaintenanceTable";
import "../styles/venueDashboard.css";

const MaintenanceRecords = () => {
  return (
    <div className="venue-dashboard">
      <Sidebar />
      <main className="venue-main">
        <Navbar />
        <div className="venue-content">
          <MaintenanceTable />
        </div>
      </main>
    </div>
  );
};

export default MaintenanceRecords;
