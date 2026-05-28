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
import EventDashboard from "./pages/events/EventDashboard";

// Route Guard Components
import AdminProtectedRoute from "./components/AdminProtectedRoute";

// Smart Protected Route Guard for Users
function UserProtectedRoute({ children }) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!loggedInUser || !token) {
    if (location.pathname.startsWith("/user/event-management")) {
      return <Navigate to="/login?from=event-management" replace />;
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
        <Route path="events" element={<div>Events Component Placeholder</div>} />
        <Route path="resources" element={<EventResources />} />
        <Route path="categories" element={<EventCategory />} />
        <Route path="analytics" element={<Payments />} />
      </Route>

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