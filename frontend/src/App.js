import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";


// Protected Route Component
function ProtectedRoute({ children }) {
  const adminToken = localStorage.getItem("adminToken");

  return adminToken ? children : <Navigate to="/admin-login" />;
}

function App() {
  return (
    <Routes>

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/home" />} />

      {/* Home Page */}
      <Route path="/home" element={<Home />} />


      {/* User Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      {/* Admin Routes */}
      <Route path="/admin-login" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all Route */}
      <Route path="*" element={<Navigate to="/home" />} />

    </Routes>
  );
}

export default App;