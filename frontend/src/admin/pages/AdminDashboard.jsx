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
  TrendingUp,
  Settings,
  Plus,
  Loader2,
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
    { key: "venue-bookings", label: "Venue Bookings" },
    { key: "availability-calendar", label: "Availability Calendar" },
    { key: "seating-layout", label: "Seating Arrangements" },
    { key: "maintenance", label: "Maintenance Records" },
    { key: "venue-revenue", label: "Venue Revenue" },
  ];

  const [events, setEvents] = useState([
    { id: 1, name: "Tech Summit 2026", date: "2026-06-15", venue: "Convention Center", status: "Confirmed" },
    { id: 2, name: "Annual Gala", date: "2026-07-20", venue: "Grand Ballroom", status: "Planning" },
    { id: 3, name: "Wedding Ceremony", date: "2026-08-10", venue: "Garden Estate", status: "Confirmed" },
  ]);

  const [clients] = useState([
    { name: "Tech Corp", events: 5, status: "Active" },
    { name: "Fashion Inc", events: 3, status: "Active" },
    { name: "Local NGO", events: 1, status: "Inactive" },
  ]);

  const [payments, setPayments] = useState([
    { id: "INV-001", amount: "RS.5,000", status: "Pending" },
    { id: "INV-002", amount: "RS.8,500", status: "Paid" },
  ]);

  const [bookings, setBookings] = useState([
    { id: "BK-9041", client: "TechCorp Labs", eventName: "Annual Tech Summit 2026", date: "2026-06-15", amount: "RS.45,000", status: "Confirmed" },
    { id: "BK-9042", client: "Sarah Jenkins", eventName: "Wedding Reception Panel", date: "2026-06-22", amount: "RS.28,000", status: "Pending" },
    { id: "BK-9043", client: "Alpha Media Hub", eventName: "Product Launch Expo", date: "2026-07-05", amount: "RS.62,000", status: "Confirmed" },
    { id: "BK-9044", client: "David Miller", eventName: "Charity Gala Dinner", date: "2026-07-12", amount: "RS.31,000", status: "Cancelled" },
    { id: "BK-9045", client: "FinTech Global", eventName: "Executive Retreat", date: "2026-07-19", amount: "RS.50,000", status: "Pending" },
  ]);

  const [recentActivities, setRecentActivities] = useState([
    { action: "Santhosh approved vendor contract", event: "Summer Fest", time: "Just now" },
    { action: "Payment received from Vortex Media", event: "Q2 services", time: "45 minutes ago" },
    { action: "Inventory Alert: Audio-visual stock low", event: "Mangalore Fest", time: "2 hours ago" },
  ]);

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ name: "", date: "", venue: "", status: "Planning" });
  const [auditLoading, setAuditLoading] = useState(false);
  const [clientFilter, setClientFilter] = useState("All");
  const [bookingFilter, setBookingFilter] = useState("All");
  const [reportDownloading, setReportDownloading] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    twoFactor: false,
    systemMaintenance: false,
  });

  useEffect(() => {
    if (activeTab === "bookings") {
      setBookingLoading(true);
      const timer = setTimeout(() => setBookingLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const logActivity = (action, eventDetail) => {
    setRecentActivities((current) => [{ action, event: eventDetail, time: "Just now" }, ...current]);
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents((current) => current.map((ev) => (ev.id === editingEvent.id ? { ...editingEvent } : ev)));
      logActivity(`Updated event "${editingEvent.name}"`, editingEvent.venue);
      setEditingEvent(null);
    } else {
      const created = { ...newEvent, id: Date.now() };
      setEvents((current) => [...current, created]);
      logActivity(`Created new event "${created.name}"`, created.venue);
      setNewEvent({ name: "", date: "", venue: "", status: "Planning" });
    }
    setIsEventModalOpen(false);
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setIsEventModalOpen(true);
  };

  const runAutoAudit = () => {
    setAuditLoading(true);
    setTimeout(() => {
      setAuditLoading(false);
      alert("System Audit completed! Remaining pending client records processed and synchronized successfully.");
      logActivity("Executed automated system infrastructure audit", "Vendor Logistics Management");
    }, 2000);
  };

  const togglePaymentStatus = (id) => {
    setPayments((current) => current.map((p) => (p.id === id ? { ...p, status: p.status === "Paid" ? "Pending" : "Paid" } : p)));
    logActivity(`Changed status of invoice ${id}`, "Payment Processing");
  };

  const handleBookingStatusChange = (id, newStatus) => {
    setBookings((current) => current.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
    logActivity(`Mutated Transaction State of ${id} to ${newStatus}`, "Ingestion Buffer Framework");
  };

  const generateReport = (reportName) => {
    setReportDownloading(reportName);
    setTimeout(() => {
      setReportDownloading(null);
      const dataString = `Report,GeneratedAt,Status\n${reportName},${new Date().toISOString()},Success`;
      const blob = new Blob([dataString], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("href", url);
      a.setAttribute("download", `${reportName.toLowerCase().replace(/\s+/g, "_")}_export.csv`);
      a.click();
      logActivity(`Generated and exported analytical document: ${reportName}`, "Data Exports");
    }, 1500);
  };

  const filteredBookings = bookings.filter((b) => (bookingFilter === "All" ? true : b.status === bookingFilter));

  const routeTitles = {
    "/admin/venue-management/overview": "Overview",
    "/admin/venue-management/add-venue": "Add Venue",
    "/admin/venue-management/all-venues": "All Venues",
    "/admin/venue-management/venue-bookings": "Venue Bookings",
    "/admin/venue-management/availability-calendar": "Availability Calendar",
    "/admin/venue-management/seating-layout": "Seating Arrangements",
    "/admin/venue-management/maintenance": "Maintenance Records",
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
    : activeTab === "bookings"
    ? "Bookings Dashboard"
    : activeTab === "payments"
    ? "Payment Ledger"
    : activeTab === "reports"
    ? "Reports"
    : activeTab === "settings"
    ? "System Settings"
    : "Dashboard Overview";

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white transition-all duration-300 flex flex-col overflow-hidden`}
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

        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          <div className="space-y-2">
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
          </div>

          <div className="space-y-2">
            {sidebarOpen && <div className="px-4 text-xs uppercase tracking-wider text-gray-500">Venue Management</div>}
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
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                      location.pathname === `/admin/venue-management/${item.key}`
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            {[
              { id: "bookings", label: "Bookings", icon: Clock },
              { id: "payments", label: "Payments", icon: DollarSign },
              { id: "reports", label: "Reports", icon: TrendingUp },
              { id: "settings", label: "Settings", icon: Settings },
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

                  <button onClick={runAutoAudit} className="w-full mt-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-2 rounded-lg font-semibold transition-all">
                    {auditLoading ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="animate-spin" size={18} /> Auditing...
                      </span>
                    ) : (
                      "Run Auto-Audit"
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Operations Security Audit Log</h3>
                <div className="space-y-4">
                  {recentActivities.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="w-2 h-2 mt-2 bg-amber-500 rounded-full flex-shrink-0" />
                      <div className="flex-1 flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{item.action}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{item.event}</p>
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeTab === "events" ? (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">All Events</h3>
                  <p className="text-sm text-gray-500">Manage scheduled event deliveries and operation windows.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingEvent(null);
                    setIsEventModalOpen(true);
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-all"
                >
                  <Plus size={18} />
                  <span>New Event</span>
                </button>
              </div>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm">Event Name</th>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm">Date</th>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm">Venue</th>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm">Status</th>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-gray-900">{event.name}</td>
                        <td className="px-6 py-4 text-gray-600">{event.date}</td>
                        <td className="px-6 py-4 text-gray-600">{event.venue}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${event.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleEditClick(event)} className="text-amber-600 hover:text-amber-800 font-semibold mr-4">
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setEvents((current) => current.filter((e) => e.id !== event.id));
                              logActivity(`Deleted event ${event.name}`, event.venue);
                            }}
                            className="text-red-600 hover:text-red-800 font-semibold"
                          >
                            Delete
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Manage Clients</h3>
                  <p className="text-sm text-gray-500">Review clients by account status and event volume.</p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-gray-700">Status:</label>
                  <select
                    value={clientFilter}
                    onChange={(e) => setClientFilter(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 text-sm bg-white outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {clients.filter((client) => (clientFilter === "All" ? true : client.status === clientFilter)).map((client, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200"
                  >
                    <p className="font-bold text-gray-900">{client.name}</p>
                    <p className="text-gray-600 text-sm mt-2">
                      Events: {client.events}
                    </p>
                    <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${client.status === "Active" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>
                      {client.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === "staff" ? (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Staff & Vendors</h3>
              <div className="space-y-4">
                {dashboardStats.staffAvailability.map((staff, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{staff.role}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(staff.available / staff.total) * 100}%` }} />
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="font-bold text-gray-900">{staff.available}/{staff.total}</p>
                      <p className="text-sm text-gray-500">Available</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === "bookings" ? (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              {bookingLoading ? (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Ingestion Buffer</h3>
                  <p className="text-sm text-gray-500 mb-6">Live visual monitoring array streams</p>
                  <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                    <Loader2 className="animate-spin text-amber-500 mb-4" size={36} />
                    <p className="font-semibold text-gray-800">Polling Upstream API Connection Gateways...</p>
                    <p className="text-gray-400 text-xs mt-1">Data refreshes dynamically every 5000ms.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-gray-100 mb-6 gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Booking Operations</h3>
                      <p className="text-sm text-gray-500">Track and adjust booking statuses.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 font-medium">Filter:</span>
                      <select
                        value={bookingFilter}
                        onChange={(e) => setBookingFilter(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 text-sm bg-white outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="All">All Bookings</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          <th className="py-3.5 px-4">Booking ID</th>
                          <th className="py-3.5 px-4">Client</th>
                          <th className="py-3.5 px-4">Event</th>
                          <th className="py-3.5 px-4">Date</th>
                          <th className="py-3.5 px-4">Amount</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                        {filteredBookings.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center py-8 text-gray-400 font-medium bg-gray-50/80">
                              No active transactional records found.
                            </td>
                          </tr>
                        ) : (
                          filteredBookings.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="py-3.5 px-4 font-mono font-bold text-gray-900">{item.id}</td>
                              <td className="py-3.5 px-4 font-medium">{item.client}</td>
                              <td className="py-3.5 px-4 text-gray-600">{item.eventName}</td>
                              <td className="py-3.5 px-4 text-gray-500">{item.date}</td>
                              <td className="py-3.5 px-4 font-semibold text-gray-900">{item.amount}</td>
                              <td className="py-3.5 px-4">
                                <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${item.status === "Confirmed" ? "bg-green-100 text-green-800 border-green-200" : item.status === "Pending" ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-red-100 text-red-800 border-red-200"}`}>
                                  {item.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                  {item.status !== "Confirmed" && (
                                    <button
                                      onClick={() => handleBookingStatusChange(item.id, "Confirmed")}
                                      className="px-2 py-1 text-xs font-bold text-green-700 bg-green-50 border border-green-200 rounded hover:bg-green-100 transition-colors"
                                    >
                                      Confirm
                                    </button>
                                  )}
                                  {item.status !== "Pending" && (
                                    <button
                                      onClick={() => handleBookingStatusChange(item.id, "Pending")}
                                      className="px-2 py-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded hover:bg-amber-100 transition-colors"
                                    >
                                      Hold
                                    </button>
                                  )}
                                  {item.status !== "Cancelled" && (
                                    <button
                                      onClick={() => handleBookingStatusChange(item.id, "Cancelled")}
                                      className="px-2 py-1 text-xs font-bold text-red-700 bg-red-50 border border-red-200 rounded hover:bg-red-100 transition-colors"
                                    >
                                      Cancel
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          ) : activeTab === "payments" ? (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Accounting Ledger</h3>
              <p className="text-sm text-gray-500 mb-6">Toggle invoice payment status directly.</p>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm">Invoice ID</th>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm">Amount</th>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm">Status</th>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-sm text-gray-900">{payment.id}</td>
                        <td className="px-6 py-4 font-semibold text-gray-800 text-sm">{payment.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${payment.status === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => togglePaymentStatus(payment.id)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-bold transition-all border border-gray-300"
                          >
                            Mark as {payment.status === "Paid" ? "Pending" : "Paid"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === "reports" ? (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Reports</h3>
              <p className="text-sm text-gray-500 mb-6">Export operational insights across events, finance, staff, and vendors.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Revenue Report", "Event Analytics", "Staff Performance", "Vendor Report"].map((report) => (
                  <button
                    key={report}
                    onClick={() => generateReport(report)}
                    disabled={reportDownloading !== null}
                    className="p-5 border border-gray-200 rounded-xl hover:border-amber-500 text-left transition-all hover:shadow-sm flex justify-between items-center bg-white group disabled:opacity-50"
                  >
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors">{report}</p>
                      <p className="text-xs text-gray-400 mt-1">Download as CSV</p>
                    </div>
                    {reportDownloading === report ? (
                      <Loader2 className="animate-spin text-amber-600" size={20} />
                    ) : (
                      <TrendingUp size={20} className="text-gray-400 group-hover:text-amber-500 transition-colors" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : activeTab === "settings" ? (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 max-w-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-1">System Settings</h3>
              <p className="text-sm text-gray-500 mb-6">Toggle core admin system behavior.</p>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Email Notifications</p>
                    <p className="text-xs text-gray-400 mt-0.5">Daily alert and report dispatches.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings((current) => ({ ...current, emailNotifications: e.target.checked }))}
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-400 mt-0.5">Strengthens admin console security.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.twoFactor}
                    onChange={(e) => setSettings((current) => ({ ...current, twoFactor: e.target.checked }))}
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">System Maintenance Mode</p>
                    <p className="text-xs text-gray-400 mt-0.5">Pause scheduled dispatches for maintenance.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.systemMaintenance}
                    onChange={(e) => setSettings((current) => ({ ...current, systemMaintenance: e.target.checked }))}
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {isEventModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4 border border-gray-100">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h4 className="text-lg font-bold text-gray-900">{editingEvent ? "Edit Event" : "Create New Event"}</h4>
              <button onClick={() => setIsEventModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Event Name</label>
                <input
                  type="text"
                  required
                  value={editingEvent ? editingEvent.name : newEvent.name}
                  onChange={(e) =>
                    editingEvent
                      ? setEditingEvent((current) => ({ ...current, name: e.target.value }))
                      : setNewEvent((current) => ({ ...current, name: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-amber-500 bg-gray-50"
                  placeholder="e.g. Bangalore Corporate Meet"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={editingEvent ? editingEvent.date : newEvent.date}
                    onChange={(e) =>
                      editingEvent
                        ? setEditingEvent((current) => ({ ...current, date: e.target.value }))
                        : setNewEvent((current) => ({ ...current, date: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-amber-500 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                  <select
                    value={editingEvent ? editingEvent.status : newEvent.status}
                    onChange={(e) =>
                      editingEvent
                        ? setEditingEvent((current) => ({ ...current, status: e.target.value }))
                        : setNewEvent((current) => ({ ...current, status: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-amber-500 bg-gray-50"
                  >
                    <option value="Planning">Planning</option>
                    <option value="Confirmed">Confirmed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Venue</label>
                <input
                  type="text"
                  required
                  value={editingEvent ? editingEvent.venue : newEvent.venue}
                  onChange={(e) =>
                    editingEvent
                      ? setEditingEvent((current) => ({ ...current, venue: e.target.value }))
                      : setNewEvent((current) => ({ ...current, venue: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-amber-500 bg-gray-50"
                  placeholder="e.g. Skyline Convention Hall"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setIsEventModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-100 rounded-lg transition-all">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-all">
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
