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
 HEAD
import Home from "./pages/Home";

import Dashboard from "./user-dashboard/pages/Dashboard";
import BrowseEvents from "./user-dashboard/pages/BrowseEvents";
import MyBookings from "./user-dashboard/pages/MyBookings";
import Wishlist from "./user-dashboard/pages/Wishlist";
import Payments from "./user-dashboard/pages/payments";
import Profile from "./user-dashboard/pages/Profile";
import Settings from "./user-dashboard/pages/Settings";
import HelpSupport from "./user-dashboard/pages/HelpSupport";

// Protected Route Component
function ProtectedRoute({ children }) {

  const adminToken =
    localStorage.getItem("adminToken");

  return adminToken
    ? children
    : <Navigate to="/admin-login" />;
}

function UserProtectedRoute({ children }) {

  const loggedInUser =
    localStorage.getItem("loggedInUser");

  return loggedInUser
    ? children
    : <Navigate to="/login" />;
}

import AdminProtectedRoute from "./components/AdminProtectedRoute";
 ad032d66962f4ca0a93a00ddc18786e074d9a46b

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

 HEAD
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

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Register Page */}
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
ad032d66962f4ca0a93a00ddc18786e074d9a46b
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

      {/* Admin Login */}
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

 HEAD
      {/* Catch All */}
      <Route
        path="*"
        element={<Navigate to="/home" />}
      />


ad032d66962f4ca0a93a00ddc18786e074d9a46b
    </Routes>
  );
}

export default App;
