import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Standard Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// Main User Dashboard Components
import Dashboard from "./user-dashboard/pages/Dashboard";
import BrowseEvents from "./user-dashboard/pages/BrowseEvents";
import MyBookings from "./user-dashboard/pages/MyBookings";
import Wishlist from "./user-dashboard/pages/Wishlist";
import Payments from "./user-dashboard/pages/payments";
import Profile from "./user-dashboard/pages/Profile";
import ChangePassword from "./user-dashboard/pages/ChangePassword";
import Settings from "./user-dashboard/pages/Settings";
import HelpSupport from "./user-dashboard/pages/HelpSupport";

// Event Management Layout and Base Workflow Pages
import EventManagementDashboard from "./pages/events/EventManagementDashboard";
import EventCategory from "./pages/events/EventCategory";
import EventDetails from "./pages/events/EventDetails";
import EventResources from "./pages/events/EventResources";
import ResourcesPage from "./pages/events/ResourcesPage";
import EventDashboard from "./pages/events/EventDashboard";
import EventsPage from "./pages/events/EventsPage";
import CalendarPage from "./pages/events/CalendarPage";

// Venue Management Pages (NEW IMPORTS)
import VenueDashboard from "./venue-management/pages/VenueDashboard";
import AddVenue from "./venue-management/pages/AddVenue";
import AllVenues from "./venue-management/pages/AllVenues";
import MaintenanceRecords from "./venue-management/pages/MaintenanceRecords";
import SeatingArrangements from "./venue-management/pages/SeatingArrangements";
import VenueBookings from "./venue-management/pages/VenueBookings";
import VenueDetails from "./venue-management/pages/VenueDetails";

// Route Guard Components
import AdminProtectedRoute from "./components/AdminProtectedRoute";

// Smart Protected Route Guard for Users
function UserProtectedRoute({ children }) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!loggedInUser || !token) {
    if (location.pathname.startsWith("/user/event-management") || location.pathname.startsWith("/venue")) {
      return <Navigate to="/login?from=venue-management" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<div>Forgot Password Page</div>} />

      {/* --- General User Dashboard Routes --- */}
      <Route
        path="/user/dashboard"
        element={
          <UserProtectedRoute>
            <Dashboard />
          </UserProtectedRoute>
        }
      />
      <Route path="/user/dashbord" element={<Navigate to="/user/dashboard" replace />} />

      <Route
        path="/user/browse-events"
        element={
          <UserProtectedRoute>
            <BrowseEvents />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/user/my-bookings"
        element={
          <UserProtectedRoute>
            <MyBookings />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/user/wishlist"
        element={
          <UserProtectedRoute>
            <Wishlist />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/user/payments"
        element={
          <UserProtectedRoute>
            <Payments />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/user/profile"
        element={
          <UserProtectedRoute>
            <Profile />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/user/change-password"
        element={
          <UserProtectedRoute>
            <ChangePassword />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/user/settings"
        element={
          <UserProtectedRoute>
            <Settings />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/user/help-support"
        element={
          <UserProtectedRoute>
            <HelpSupport />
          </UserProtectedRoute>
        }
      />

      {/* --- Event Creation & Inner Management Workflow --- */}
      <Route
        path="/user/create-event"
        element={
          <UserProtectedRoute>
            <EventCategory />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/user/event/:eventId"
        element={
          <UserProtectedRoute>
            <EventDetails />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/user/event-details/:eventId"
        element={
          <UserProtectedRoute>
            <EventDetails />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/user/event-resources/:eventId"
        element={
          <UserProtectedRoute>
            <EventResources />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/user/event-dashboard/:eventId"
        element={
          <UserProtectedRoute>
            <EventDashboard />
          </UserProtectedRoute>
        }
      />

      {/* --- Main Nested Layout Route For Event Management --- */}
      <Route
        path="/user/event-management"
        element={
          <UserProtectedRoute>
            <EventManagementDashboard />
          </UserProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<EventDashboard />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="categories" element={<EventCategory />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="analytics" element={<Payments />} />
      </Route>

      {/* --- Venue Management System Routes (NEW SECTION) --- */}
      <Route
        path="/venue/dashboard"
        element={
          <UserProtectedRoute>
            <VenueDashboard />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/venue/all"
        element={
          <UserProtectedRoute>
            <AllVenues />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/venue/add"
        element={
          <UserProtectedRoute>
            <AddVenue />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/venue/bookings"
        element={
          <UserProtectedRoute>
            <VenueBookings />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/venue/maintenance"
        element={
          <UserProtectedRoute>
            <MaintenanceRecords />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/venue/seating"
        element={
          <UserProtectedRoute>
            <SeatingArrangements />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/venue/details/:id"
        element={
          <UserProtectedRoute>
            <VenueDetails />
          </UserProtectedRoute>
        }
      />

      {/* --- Admin Panel Routes --- */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      {/* --- Fallback Catch-All Route --- */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;