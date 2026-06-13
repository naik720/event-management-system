import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  Clock,
  Users,
  HelpCircle,
  LogOut,
  Plus,
  Eye,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

function EventManagementDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("loggedInUser") || localStorage.getItem("user");

    // 🛡️ Secure Authentication Redirect
    if (!token) {
      navigate("/login?from=event-management");
      return;
    }

    if (user) {
      try {
        setUserData(JSON.parse(user));
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }

    fetchUserEvents();
  }, [navigate]);

  const fetchUserEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:5000/api/events/user-events", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleCreateNewEvent = () => {
    navigate("/user/create-event");
  };

  // Helper flag to check if we are on the base route or the sub-dashboard path
  const isBaseDashboard =
    location.pathname === "/user/event-management" ||
    location.pathname === "/user/event-management/" ||
    location.pathname === "/user/event-management/dashboard";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* --- Sidebar Navigation Framework --- */}
      <div className="w-64 bg-[#1e2640] text-[#9aa4b7] p-6 flex flex-col overflow-y-auto border-r border-[#151b30]">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1 text-white">
            <span className="text-[#f59e0b]">EMS</span>
          </h1>
          <p className="text-[#64748b] text-xs font-semibold uppercase tracking-wider">Event Management</p>
        </div>

        <button
          onClick={handleCreateNewEvent}
          className="w-full bg-[#ea580c] hover:bg-[#d97706] text-white font-semibold py-3 px-4 rounded-lg mb-8 flex items-center justify-center gap-2 transition shadow-sm"
        >
          <Plus size={20} />
          Create Event
        </button>

        <nav className="space-y-2 flex-1">
          {[
            { path: "dashboard", label: "Dashboard", icon: "📊" },
            { path: "events", label: "Events", icon: "📅" },
            { path: "resources", label: "Resources", icon: "👥" },
            { path: "categories", label: "Categories", icon: "🏷️" },
            { path: "calendar", label: "Calendar", icon: "📅" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={`/user/event-management/${item.path}`}
              className={({ isActive }) =>
                `w-full flex items-center px-4 py-3 rounded-lg transition ${isActive || (item.path === "dashboard" && isBaseDashboard)
                  ? "bg-[#ea580c] font-semibold text-white"
                  : "hover:bg-[#252f4c] text-[#9aa4b7] hover:text-white"
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-2 pt-4 border-t border-[#151b30]">
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#252f4c] hover:text-white transition text-[#9aa4b7] flex items-center gap-2">
            <HelpCircle size={18} />
            Help Center
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#252f4c] hover:text-white transition text-[#9aa4b7] flex items-center gap-2"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </div>

      {/* --- Main Sub-Router Layout View Panel --- */}
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Top Header Control Strip */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shrink-0">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">
              {userData ? `${userData.name}'s Workspace` : "Organization Workspace"}
            </h2>
            <p className="text-gray-600 text-sm">Operational performance for Q3 2026</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700">
              Export Report
            </button>
            <button
              onClick={handleCreateNewEvent}
              className="px-6 py-2 bg-[#ea580c] hover:bg-[#d97706] text-white rounded-lg transition font-semibold shadow-sm"
            >
              + New Event
            </button>
          </div>
        </div>

        {/* Dynamic Display Portal Container */}
        <div className="flex-1">
          {isBaseDashboard ? (
            <DashboardOverview
              events={events}
              handleCreateNewEvent={handleCreateNewEvent}
              navigate={navigate}
            />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
    Secondary Sub-Component: Base Dashboard Metrics and Reports Visuals
   ========================================================================== */
function DashboardOverview({ events, handleCreateNewEvent, navigate }) {
  const revenueData = [
    { month: "Mar", revenue: 320 },
    { month: "Apr", revenue: 385 },
    { month: "May", revenue: 280 },
    { month: "Jun", revenue: 430 },
    { month: "Jul", revenue: 490 },
    { month: "Aug", revenue: 615 },
  ];

  const upcomingEvents = events.filter(e => e.status !== "Completed" && e.status !== "Cancelled");
  const completedEvents = events.filter(e => e.status === "Completed").length;

  return (
    <div className="p-8 animate-fade-in">
      {/* Metric Cards Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 border-l-4 border-[#3b82f6]">
          <div className="flex justify-between items-start mb-4">
            <Calendar className="text-[#3b82f6]" size={32} />
            <span className="text-green-500 font-semibold text-sm">+12%</span>
          </div>
          <p className="text-gray-600 font-semibold text-sm mb-1">Upcoming Events</p>
          <p className="text-3xl font-bold text-gray-800">{upcomingEvents.length}</p>
          <p className="text-gray-500 text-xs mt-2">14 scheduled this month</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 border-l-4 border-[#8b5cf6]">
          <div className="flex justify-between items-start mb-4">
            <Clock className="text-[#8b5cf6]" size={32} />
            <span className="text-blue-500 font-semibold text-sm">Steady</span>
          </div>
          <p className="text-gray-600 font-semibold text-sm mb-1">Ongoing Today</p>
          <p className="text-3xl font-bold text-gray-800">
            {events.filter(e => e.status === "Ongoing").length}
          </p>
          <p className="text-gray-500 text-xs mt-2">Across 4 regions</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 border-l-4 border-[#10b981]">
          <div className="flex justify-between items-start mb-4">
            <Users className="text-[#10b981]" size={32} />
            <span className="text-gray-600 text-sm">85% of target met</span>
          </div>
          <p className="text-gray-600 font-semibold text-sm mb-1">Completed YTD</p>
          <p className="text-3xl font-bold text-gray-800">{completedEvents}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 border-l-4 border-[#f59e0b]">
          <div className="flex justify-between items-start mb-4">
            <TrendingUp className="text-[#f59e0b]" size={32} />
          </div>
          <p className="text-gray-600 font-semibold text-sm mb-1">Avg. Client Rating</p>
          <p className="text-3xl font-bold text-gray-800">4.92</p>
          <div className="text-yellow-500 text-sm mt-2">★★★★★</div>
        </div>
      </div>

      {/* Analytical Charts and Summary Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800">Revenue Performance</h3>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold text-gray-800">4.5 lakh</span>
              <span className="text-gray-600 text-sm">Last 6 months</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-br from-[#1e2640] to-[#151b30] border border-[#151b30] rounded-lg p-6 shadow-sm text-white flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#f59e0b]">Quick Insight</h3>
            <p className="text-sm text-[#9aa4b7]">
              💡 Ticket sales for "TechSummit 2026" are 22% higher than last year's average at this stage. Consider releasing the Early Bird phase-2 tickets earlier.
            </p>
          </div>
          <button className="w-full mt-6 bg-[#ea580c] text-white font-semibold py-2 rounded-lg hover:bg-[#d97706] transition shadow-sm">
            View Sales Report
          </button>
        </div>
      </div>

      {/* Active Portfolio Data-Table Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800">Current Portfolio</h3>
          <button
            onClick={() => navigate("/user/dashboard")}
            className="text-[#ea580c] hover:text-[#d97706] font-semibold text-sm"
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Event Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {events.slice(0, 3).map((event, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-4 text-gray-800 font-semibold">{event.title}</td>
                  <td className="py-4 px-4 text-gray-600">{event.category}</td>
                  <td className="py-4 px-4 text-gray-600">
                    {new Date(event.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${event.status === "Planning"
                        ? "bg-orange-100 text-orange-700"
                        : event.status === "Scheduled"
                          ? "bg-blue-100 text-blue-700"
                          : event.status === "Ongoing"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => navigate(`/user/event-dashboard/${event._id}`)}
                      className="text-[#ea580c] hover:text-[#d97706] font-semibold text-sm flex items-center gap-1"
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {events.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="mx-auto text-gray-400 mb-2" size={48} />
              <p className="text-gray-600">No events created yet</p>
              <button
                onClick={handleCreateNewEvent}
                className="text-[#ea580c] hover:text-[#d97706] font-semibold mt-2"
              >
                Create your first event
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventManagementDashboard;