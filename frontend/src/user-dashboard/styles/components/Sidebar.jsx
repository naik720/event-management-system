import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  CircleHelp,
  Heart,
  Home,
  LogOut,
  MapPin,
  Settings,
  Ticket,
  User,
  WalletCards,
  Bell,
  MessageSquare,
  FilePlus,
  LayoutDashboard,
} from "lucide-react";

import "../dashboard.css";
import "../../../styles/unified-dashboard.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication check helper for Event Management Dashboard
  const handleEventManagementClick = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("token");

    if (loggedInUser && token) {
      navigate("/user/event-management/dashboard");
    } else {
      navigate("/login?from=event-management");
    }
  };

  // Re-ordered menu items to place Event Management right above Event Request
  const menuItems = [
    { label: "Client Dashboard", icon: Home, path: "/client/dashboard" },
    { label: "Browse Events", icon: CalendarDays, path: "/client/browse-events" },
    { label: "Browse Venues", icon: MapPin, path: "/client/browse-venues" },
    { label: "My Bookings", icon: Ticket, path: "/client/my-bookings" },
    { label: "Wishlist", icon: Heart, path: "/client/wishlist" },
    { label: "Payments", icon: WalletCards, path: "/client/payments" },
    { label: "Notification", icon: Bell, path: "/client/notification" },
    { label: "Feedback", icon: MessageSquare, path: "/client/feedback" },
    {
      label: "Event Management Dashboard",
      icon: LayoutDashboard,
      path: "/user/event-management/dashboard",
      onClick: handleEventManagementClick
    },
    { label: "Event Request", icon: FilePlus, path: "/client/event-request" },
    { label: "Profile", icon: User, path: "/client/profile" },
    { label: "Settings", icon: Settings, path: "/client/settings" },
    { label: "Help & Support", icon: CircleHelp, path: "/client/help-support" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
    <div className="sidebar-unified">
      <div className="sidebar-content-unified">
        <div className="logo-section-unified">
          <div>
            <h2>EMS</h2>
            <p>Client Module</p>
=======
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-brand">
          <div className="sidebar-brand-mark">EMS</div>
          <div className="sidebar-brand-copy">
            <h2>Client Dashboard</h2>
            <p>Browse events, manage bookings, and keep your client tools in one place.</p>
>>>>>>> Stashed changes
          </div>
        </div>

<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
        <ul className="menu-unified">
          {menuItems.map(({ label, icon: Icon, path, onClick }) => (
            <li
              className={`menu-item-unified ${location.pathname.startsWith(path) ? "menu-item-active" : ""}`}
<<<<<<< Updated upstream
=======
=======
        <div className="sidebar-section-label">Navigation</div>

        <ul className="menu">
          {menuItems.map(({ label, icon: Icon, path }) => {
            const isActive =
              location.pathname === path ||
              (path === "/client/browse-events" && location.pathname.startsWith("/client/event/"));

            return (
            <li
              className={isActive ? "active" : ""}
>>>>>>> Stashed changes
>>>>>>> Stashed changes
              key={label}
              onClick={onClick ? onClick : () => navigate(path)}
            >
              <Icon size={18} />
              {label}
            </li>
            );
          })}
        </ul>
      </div>

<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
      <div className="logout-unified" onClick={handleLogout}>
        <LogOut size={18} />
        Logout
=======
      <div className="sidebar-footer">
        <button type="button" className="logout" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
>>>>>>> Stashed changes
      </div>
    </aside>
  );
};

export default Sidebar;