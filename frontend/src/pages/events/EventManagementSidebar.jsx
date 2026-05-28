import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, HelpCircle, LogOut } from "lucide-react";

function EventManagementSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCreateNewEvent = () => {
    navigate("/user/create-event");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊", path: "/user/event-management" },
    { id: "events", label: "Events", icon: "📅", path: "/user/events" },
    { id: "resources", label: "Resources", icon: "👥", path: "/user/resources" },
    { id: "calendar", label: "Calendar", icon: "📆", path: "/user/calendar" },
    { id: "analytics", label: "Analytics", icon: "📈", path: "/user/analytics" },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white p-6 flex flex-col overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">EventSync Pro</h1>
        <p className="text-indigo-200 text-sm">Enterprise Plan</p>
      </div>

      <button
        onClick={handleCreateNewEvent}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-4 rounded-lg mb-8 flex items-center justify-center gap-2 transition"
      >
        <Plus size={20} />
        Create Event
      </button>

      <nav className="space-y-2 flex-1">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              isActive(item.path)
                ? "bg-indigo-600 font-semibold"
                : "hover:bg-indigo-700 text-indigo-100"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="space-y-2 pt-4 border-t border-indigo-700">
        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-700 transition text-indigo-100 flex items-center gap-2">
          <HelpCircle size={18} />
          Help Center
        </button>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-700 transition text-indigo-100 flex items-center gap-2"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </div>
  );
}

export default EventManagementSidebar;
