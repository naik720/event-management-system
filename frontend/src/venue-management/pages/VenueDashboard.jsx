import React from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import VenueWorkflow from "../components/VenueWorkflow";
import VenueOverviewChart from "../components/VenueOverviewChart";
import MaintenanceStatus from "../components/MaintenanceStatus";
import AvailableVenuesTable from "../components/AvailableVenuesTable";
import UpcomingBookings from "../components/UpcomingBookings";
import CapacityOverview from "../components/CapacityOverview";
import MaintenanceTable from "../components/MaintenanceTable";
import VenueTypes from "../components/VenueTypes";
import SeatingCards from "../components/SeatingCards";
import DatabaseCollections from "../components/DatabaseCollections";
import "../styles/venueDashboard.css";

const VenueDashboard = () => {
  return (
    <div className="venue-dashboard">
      <Sidebar />

      <main className="venue-main">
        <Navbar />

        <div className="venue-content">
          <div className="venue-breadcrumb">
            <strong>Dashboard</strong>
            <span>›</span>
            <p>Venue Management</p>
          </div>

          <StatsCards />

          <div className="venue-grid venue-grid-top">
            <VenueWorkflow />
            <VenueOverviewChart />
            <MaintenanceStatus />
          </div>

          <div className="venue-grid venue-grid-middle">
            <AvailableVenuesTable />
            <UpcomingBookings />
            <CapacityOverview />
          </div>

          <div className="venue-grid venue-grid-bottom">
            <MaintenanceTable />
            <VenueTypes />
          </div>

          <div className="venue-grid venue-grid-extra">
            <SeatingCards />
            <DatabaseCollections />
          </div>
        </div>
      </main>
    </div>
  );
};

export default VenueDashboard;
