import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Menu,
  X,
  LogOut,
  Calendar,
  Users,
  DollarSign,
  Clock,
  AlertCircle,
  Store,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import VenueDashboard from "../venue-management/pages/VenueDashboard";
import AddVenue from "../venue-management/pages/AddVenue";
import AllVenues from "../venue-management/pages/AllVenues";
import VenueBookings from "../venue-management/pages/VenueBookings";
import MaintenanceRecords from "../venue-management/pages/MaintenanceRecords";
import SeatingArrangements from "../venue-management/pages/SeatingArrangements";
import VenueDetails from "../venue-management/pages/VenueDetails";
import AvailabilityCalendar from "../venue-management/pages/AvailabilityCalendar";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [venueOpen, setVenueOpen] = useState(location.pathname.startsWith("/admin/venue-management"));

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin-login");
    }
  }, [navigate]);

  useEffect(() => {
    if (location.pathname.startsWith("/admin/venue-management")) {
      setVenueOpen(true);
    }
    if (location.pathname === "/admin" || location.pathname === "/admin/dashboard") {
      setActiveTab("overview");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/admin-login");
  };

  const dashboardStats = {
    totalEvents: 1482,
    upcomingEvents: 156,
    revenueThisMonth: "$2.48M",
    revenueGrowth: "+24.5%",
    staffAvailability: [
      { role: "Field Technicians", available: 84, total: 90 },
      { role: "Event Coordinators", available: 12, total: 15 },
      { role: "Support Crew", available: 218, total: 260 },
    ],
    vendorStatus: {
      activeContracts: 42,
      pendingAudit: 3,
      nextAudit: "Oct 15",
    },
    pendingPayments: 8,
  };

  const revenueData = [
    { month: "Jan", revenue: 1800000, target: 1500000 },
    { month: "Feb", revenue: 2100000, target: 1500000 },
    { month: "Mar", revenue: 1900000, target: 1500000 },
    { month: "Apr", revenue: 2300000, target: 1500000 },
    { month: "May", revenue: 2480000, target: 1500000 },
  ];

  const eventDistribution = [
    { name: "Conferences", value: 350, color: "#3b82f6" },
    { name: "Weddings", value: 420, color: "#ec4899" },
    { name: "Corporate", value: 380, color: "#8b5cf6" },
    { name: "Social", value: 332, color: "#10b981" },
  ];

  const staffData = [
    { name: "Field Technicians", available: 84, total: 90 },
    { name: "Coordinators", available: 12, total: 15 },
    { name: "Support Crew", available: 218, total: 260 },
  ];

  const venueMenu = [
    { key: "overview", label: "Overview" },
    { key: "add-venue", label: "Add Venue" },
    { key: "all-venues", label: "All Venues" },
    { key: "venue-bookings", label: "Booking Requests" },
    { key: "availability-calendar", label: "Availability Calendar" },
    { key: "seating-layout", label: "Seating Layout" },
    { key: "maintenance", label: "Maintenance" },
    { key: "venue-revenue", label: "Venue Revenue" },
  ];

  const routeTitles = {
    "/admin/venue-management/overview": "Venue Dashboard",
    "/admin/venue-management/add-venue": "Add Venue",
    "/admin/venue-management/all-venues": "All Venues",
    "/admin/venue-management/venue-bookings": "Booking Requests",
    "/admin/venue-management/availability-calendar": "Availability Calendar",
    "/admin/venue-management/seating-layout": "Seating Layout",
    "/admin/venue-management/maintenance": "Maintenance",
    "/admin/venue-management/venue-revenue": "Venue Revenue",
  };

  const pageTitle = location.pathname.startsWith("/admin/venue-management")
    ? routeTitles[location.pathname] || "Venue Management"
    : activeTab === "events"
    ? "Manage Events"
    : activeTab === "clients"
    ? "Manage Clients"
    : activeTab === "staff"
    ? "Staff & Vendors Management"
    : "Dashboard Overview";

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className="text-2xl font-bold text-amber-400">EMS</h1>
              <p className="text-xs text-gray-400">Event Management</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { id: "overview", label: "Dashboard", icon: Calendar },
            { id: "events", label: "Manage Events", icon: Calendar },
            { id: "clients", label: "Manage Clients", icon: Users },
            { id: "staff", label: "Staff & Vendors", icon: Users },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                navigate("/admin/dashboard");
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id && !location.pathname.startsWith("/admin/venue-management")
                  ? "bg-amber-600 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}

          <div>
            <button
              onClick={() => {
                setVenueOpen((v) => !v);
                navigate("/admin/venue-management/overview");
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname.startsWith("/admin/venue-management")
                  ? "bg-amber-600 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Store size={20} />
              {sidebarOpen && <span>Venue Management</span>}
              {sidebarOpen && <span className="ml-auto">{venueOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>}
            </button>
            {sidebarOpen && venueOpen && (
              <div className="ml-4 mt-2 space-y-1 border-l border-gray-700 pl-3">
                {venueMenu.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => navigate(`/admin/venue-management/${item.key}`)}
                    className="w-full text-left px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
            {pageTitle}
          </h2>
            <p className="text-gray-500 text-sm">
              {location.pathname.startsWith("/admin/venue-management")
                ? "Venue Management Module"
                : new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {localStorage.getItem("adminEmail")}
              </p>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </div>

        <div className="p-8">
          {location.pathname === "/admin/venue-management/overview" ? (
            <VenueDashboard />
          ) : location.pathname === "/admin/venue-management/add-venue" ? (
            <AddVenue />
          ) : location.pathname === "/admin/venue-management/all-venues" ? (
            <AllVenues />
          ) : location.pathname === "/admin/venue-management/venue-bookings" ? (
            <VenueBookings />
          ) : location.pathname === "/admin/venue-management/availability-calendar" ? (
            <AvailabilityCalendar />
          ) : location.pathname === "/admin/venue-management/maintenance" ? (
            <MaintenanceRecords />
          ) : location.pathname === "/admin/venue-management/seating-layout" ? (
            <SeatingArrangements />
          ) : location.pathname === "/admin/venue-management/venue-revenue" ? (
            <VenueDetails />
          ) : location.pathname.startsWith("/admin/venue-management") ? (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900">Venue Management</h3>
                <p className="text-gray-500 mt-2">
                  Use the Venue Management submenu to access Overview, Add Venue, All Venues, Venue Bookings, Availability Calendar, Seating Layout, Maintenance, and Venue Revenue.
                </p>
              </div>
            </div>
          ) : activeTab === "overview" ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 font-semibold">Total Events</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {dashboardStats.totalEvents}
                      </p>
                    </div>
                    <Calendar className="text-blue-500" size={32} />
                  </div>
                  <p className="text-green-600 text-sm mt-4">↑ 12% from last month</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 font-semibold">Upcoming Events</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {dashboardStats.upcomingEvents}
                      </p>
                    </div>
                    <Clock className="text-purple-500" size={32} />
                  </div>
                  <p className="text-gray-600 text-sm mt-4">This month</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 font-semibold">Revenue (Q3)</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {dashboardStats.revenueThisMonth}
                      </p>
                    </div>
                    <DollarSign className="text-green-500" size={32} />
                  </div>
                  <p className="text-green-600 text-sm mt-4">
                    {dashboardStats.revenueGrowth} Growth
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 font-semibold">Pending Payments</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {dashboardStats.pendingPayments}
                      </p>
                    </div>
                    <AlertCircle className="text-red-500" size={32} />
                  </div>
                  <p className="text-red-600 text-sm mt-4">Requires attention</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Revenue Trend
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Actual Revenue"
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#9ca3af"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Target"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Event Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={eventDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {eventDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Staff Availability
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={staffData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="available" fill="#3b82f6" name="Available" />
                      <Bar dataKey="total" fill="#e5e7eb" name="Total" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Vendor Logistics
                  </h3>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-gray-600 text-sm font-semibold">
                        Active Contracts
                      </p>
                      <p className="text-3xl font-bold text-blue-600 mt-1">
                        {dashboardStats.vendorStatus.activeContracts}
                      </p>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-gray-600 text-sm font-semibold">
                        Pending Audit
                      </p>
                      <p className="text-3xl font-bold text-orange-600 mt-1">
                        {dashboardStats.vendorStatus.pendingAudit}
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-gray-600 text-sm font-semibold">
                        Next Audit
                      </p>
                      <p className="text-lg font-bold text-green-600 mt-1">
                        {dashboardStats.vendorStatus.nextAudit}
                      </p>
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-2 rounded-lg font-semibold transition-all">
                    Run Auto-Audit
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === "events" ? (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">All Events</h3>
                <button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-2 rounded-lg font-semibold">
                  + New Event
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 font-semibold text-gray-900">Event Name</th>
                      <th className="px-6 py-3 font-semibold text-gray-900">Date</th>
                      <th className="px-6 py-3 font-semibold text-gray-900">Venue</th>
                      <th className="px-6 py-3 font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-3 font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Tech Summit 2024", date: "2024-06-15", venue: "Convention Center", status: "Confirmed" },
                      { name: "Annual Gala", date: "2024-07-20", venue: "Grand Ballroom", status: "Planning" },
                      { name: "Wedding Ceremony", date: "2024-08-10", venue: "Garden Estate", status: "Confirmed" },
                    ].map((event, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-gray-900">{event.name}</td>
                        <td className="px-6 py-4 text-gray-600">{event.date}</td>
                        <td className="px-6 py-4 text-gray-600">{event.venue}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              event.status === "Confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-amber-600 hover:text-amber-800 font-semibold">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === "clients" ? (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Manage Clients
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Tech Corp", events: 5, status: "Active" },
                  { name: "Fashion Inc", events: 3, status: "Active" },
                  { name: "Local NGO", events: 1, status: "Inactive" },
                ].map((client, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200"
                  >
                    <p className="font-bold text-gray-900">{client.name}</p>
                    <p className="text-gray-600 text-sm mt-2">
                      Events: {client.events}
                    </p>
                    <span className="inline-block mt-3 px-3 py-1 bg-blue-500 text-white text-xs rounded-full font-semibold">
                      {client.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === "staff" ? (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Staff & Vendors
              </h3>
              <div className="space-y-4">
                {dashboardStats.staffAvailability.map((staff, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {staff.role}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${(staff.available / staff.total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="font-bold text-gray-900">
                        {staff.available}/{staff.total}
                      </p>
                      <p className="text-sm text-gray-500">Available</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
