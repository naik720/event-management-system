import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Standard Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";

// Main User Dashboard Components
import Dashboard from "./user-dashboard/pages/Dashboard";
import BrowseEvents from "./user-dashboard/pages/BrowseEvents";
import BrowseVenues from "./user-dashboard/pages/BrowseVenues";
import MyBookings from "./user-dashboard/pages/MyBookings";
import Wishlist from "./user-dashboard/pages/Wishlist";
import Payments from "./user-dashboard/pages/payments";
import Profile from "./user-dashboard/pages/Profile";
import ChangePassword from "./user-dashboard/pages/ChangePassword";
import Settings from "./user-dashboard/pages/Settings";
import HelpSupport from "./user-dashboard/pages/HelpSupport";
import Feedback from "./user-dashboard/pages/Feedback";
import Notification from "./user-dashboard/pages/Notification";
import EventRequest from "./user-dashboard/pages/EventRequest";
import StaffDashboard from "./Vendor&staffManagement/staff/pages/StaffDashboard";
import VendorDashboard from "./Vendor&staffManagement/vendor/pages/VendorDashboard";

// Event Management Layout and Base Workflow Pages
import EventManagementDashboard from "./pages/events/EventManagementDashboard";
import EventCategory from "./pages/events/EventCategory";
import EventDetails from "./pages/events/EventDetails";
import EventResources from "./pages/events/EventResources";
import ResourcesPage from "./pages/events/ResourcesPage";
import EventDashboard from "./pages/events/EventDashboard";
import EventsPage from "./pages/events/EventsPage";
import CalendarPage from "./pages/events/CalendarPage";

// Route Guard Components
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";

function getAuthRole() {
  return localStorage.getItem("userRole") || "client";
}

// Smart Protected Route Guard for Users
function UserProtectedRoute({ children }) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = localStorage.getItem("token");
  const role = getAuthRole();
  const location = useLocation();

  if (!loggedInUser || !token) {
    if (location.pathname.startsWith("/user/event-management")) {
      return <Navigate to="/login?from=event-management" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  if (role === "vendor" && !location.pathname.startsWith("/vendor")) {
    return <Navigate to="/vendor/dashboard" replace />;
  }

  if (role === "staff" && !location.pathname.startsWith("/staff")) {
    return <Navigate to="/staff/dashboard" replace />;
  }

  return children;
}

function RoleProtectedRoute({ allowedRoles, children }) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = localStorage.getItem("token");
  const role = getAuthRole();

  if (!loggedInUser || !token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
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
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/staff/dashboard"
        element={
          <RoleProtectedRoute allowedRoles={["staff"]}>
            <StaffDashboard />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/vendor/dashboard"
        element={
          <RoleProtectedRoute allowedRoles={["vendor"]}>
            <VendorDashboard />
          </RoleProtectedRoute>
        }
      />

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
      <Route
        path="/user/notification"
        element={
          <UserProtectedRoute>
            <Notification />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/user/feedback"
        element={
          <UserProtectedRoute>
            <Feedback />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/user/event-request"
        element={
          <UserProtectedRoute>
            <EventRequest />
          </UserProtectedRoute>
        }
      />

      {/* --- Client Dashboard Routes --- */}
      <Route
        path="/client/dashboard"
        element={
          <UserProtectedRoute>
            <Dashboard />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/client/browse-events"
        element={
          <UserProtectedRoute>
            <BrowseEvents />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/client/browse-venues"
        element={
          <UserProtectedRoute>
            <BrowseVenues />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/client/my-bookings"
        element={
          <UserProtectedRoute>
            <MyBookings />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/client/wishlist"
        element={
          <UserProtectedRoute>
            <Wishlist />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/client/payments"
        element={
          <UserProtectedRoute>
            <Payments />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/client/profile"
        element={
          <UserProtectedRoute>
            <Profile />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/client/change-password"
        element={
          <UserProtectedRoute>
            <ChangePassword />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/client/settings"
        element={
          <UserProtectedRoute>
            <Settings />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/client/help-support"
        element={
          <UserProtectedRoute>
            <HelpSupport />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/client/notification"
        element={
          <UserProtectedRoute>
            <Notification />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/client/feedback"
        element={
          <UserProtectedRoute>
            <Feedback />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/client/event-request"
        element={
          <UserProtectedRoute>
            <EventRequest />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/client/event/:eventId"
        element={
          <UserProtectedRoute>
            <EventDetails />
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
      <Route
        path="/admin/venue-management/*"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/vendor-management/*"
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
