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
} from "lucide-react";

import "../dashboard.css";
import "../../../styles/unified-dashboard.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Client Dashboard", icon: Home, path: "/client/dashboard" },
    { label: "Browse Events", icon: CalendarDays, path: "/client/browse-events" },
    { label: "Browse Venues", icon: MapPin, path: "/client/browse-venues" },
    { label: "My Bookings", icon: Ticket, path: "/client/my-bookings" },
    { label: "Wishlist", icon: Heart, path: "/client/wishlist" },
    { label: "Payments", icon: WalletCards, path: "/client/payments" },
    { label: "Notification", icon: Bell, path: "/client/notification" },
    { label: "Feedback", icon: MessageSquare, path: "/client/feedback" },
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
    <aside className="sidebar-unified">
      <div className="sidebar-content-unified">
        <div className="logo-section-unified">
          <div>
            <h2>EMS</h2>
            <p>Client Module</p>
          </div>
        </div>

        <div className="sidebar-section-label">Navigation</div>

        <ul className="menu-unified">
          {menuItems.map(({ label, icon: Icon, path }) => {
            const isActive =
              location.pathname === path ||
              (path === "/client/browse-events" && location.pathname.startsWith("/client/event/"));

            return (
              <li
                className={`menu-item-unified ${isActive ? "menu-item-active" : ""}`}
                key={label}
                onClick={() => navigate(path)}
              >
                <Icon size={18} />
                {label}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="logout-unified" onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </div>
    </aside>
  );
};

export default Sidebar;