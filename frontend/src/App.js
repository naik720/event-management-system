import React from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

import Dashboard from "./user-dashboard/pages/Dashboard";
import BrowseEvents from "./user-dashboard/pages/BrowseEvents";
import MyBookings from "./user-dashboard/pages/MyBookings";
import Wishlist from "./user-dashboard/pages/Wishlist";
import Payments from "./user-dashboard/pages/payments";
import Profile from "./user-dashboard/pages/Profile";
import EventDetails from "./user-dashboard/pages/EventDetails";
import ChangePassword from "./user-dashboard/pages/ChangePassword";
import Settings from "./user-dashboard/pages/Settings";
import HelpSupport from "./user-dashboard/pages/HelpSupport";

function UserProtectedRoute({ children }) {

  const loggedInUser =
    localStorage.getItem("loggedInUser");

  return loggedInUser
    ? children
    : <Navigate to="/login" />;
}

function App() {

  return (

    <Routes>

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to="/home" />}
      />

      {/* Home Page */}
      <Route
        path="/home"
        element={<Home />}
      />

      {/* User Login/Register */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* USER DASHBOARD */}
      <Route
        path="/user/dashboard"
        element={
          <UserProtectedRoute>
            <Dashboard />
          </UserProtectedRoute>
        }
      />

      <Route
        path="/user/dashbord"
        element={<Navigate to="/user/dashboard" replace />}
      />

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

        {/* Event Details Route */}
        <Route
          path="/user/event/:eventId"
          element={
            <UserProtectedRoute>
              <EventDetails />
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

      {/* Admin Routes */}
      <Route
        path="/admin-login"
        element={<AdminLogin />}
      />

      {/* Protected Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      {/* Catch All */}
      <Route
        path="*"
        element={<Navigate to="/home" />}
      />
    </Routes>
  );
}

export default App;
