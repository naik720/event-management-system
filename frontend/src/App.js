import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      {/* Default route redirects to the login page */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Route for Login page */}
      <Route path="/login" element={<Login />} />

      {/* Route for Register page */}
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;