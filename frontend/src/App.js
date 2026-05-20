import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
<<<<<<< Updated upstream
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// Protected Route Component
function ProtectedRoute({ children }) {
  const adminToken = localStorage.getItem("adminToken");
  return adminToken ? children : <Navigate to="/admin-login" />;
}
=======
import Home from "./pages/Home";
>>>>>>> Stashed changes

function App() {
  return (
    <Routes>

<<<<<<< Updated upstream
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

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/login" />} />
=======
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/home" />} />

      {/* Home Page */}
      <Route path="/home" element={<Home />} />

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Register Page */}
      <Route path="/register" element={<Register />} />

>>>>>>> Stashed changes
    </Routes>
  );
}

export default App;