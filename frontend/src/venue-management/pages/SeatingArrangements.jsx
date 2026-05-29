import React from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SeatingCards from "../components/SeatingCards";
import "../styles/venueDashboard.css";

const SeatingArrangements = () => {
  return (
    <div className="venue-dashboard">
      <Sidebar />
      <main className="venue-main">
        <Navbar />
        <div className="venue-content">
          <SeatingCards />
        </div>
      </main>
    </div>
  );
};

export default SeatingArrangements;
