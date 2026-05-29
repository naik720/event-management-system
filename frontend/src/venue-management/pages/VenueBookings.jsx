import React from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UpcomingBookings from "../components/UpcomingBookings";
import "../styles/venueDashboard.css";

const VenueBookings = () => {
  return (
    <div className="venue-dashboard">
      <Sidebar />
      <main className="venue-main">
        <Navbar />
        <div className="venue-content">
          <UpcomingBookings />
        </div>
      </main>
    </div>
  );
};

export default VenueBookings;
