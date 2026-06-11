import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  AlertCircle,
  Settings,
  Plus,
  Loader2
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Dynamic States for features
  const [events, setEvents] = useState([
    { id: 1, name: "Tech Summit 2026", date: "2026-06-15", venue: "Convention Center", status: "Confirmed" },
    { id: 2, name: "Annual Gala", date: "2026-07-20", venue: "Grand Ballroom", status: "Planning" },
    { id: 3, name: "Wedding Ceremony", date: "2026-08-10", venue: "Garden Estate", status: "Confirmed" },
  ]);

  const [clients, setClients] = useState([
    { name: "Tech Corp", events: 5, status: "Active" },
    { name: "Fashion Inc", events: 3, status: "Active" },
    { name: "Local NGO", events: 1, status: "Inactive" },
  ]);

  const [payments, setPayments] = useState([
    { id: "INV-001", amount: "RS.5,000", status: "Pending" },
    { id: "INV-002", amount: "RS.8,500", status: "Paid" },
  ]);

  // Integrated Booking Records State for Module Integration
  const [bookings, setBookings] = useState([
    { id: "BK-9041", client: "TechCorp Labs", eventName: "Annual Tech Summit 2026", date: "2026-06-15", amount: "RS.45,000", status: "Confirmed" },
    { id: "BK-9042", client: "Sarah Jenkins", eventName: "Wedding Reception Panel", date: "2026-06-22", amount: "RS.28,000", status: "Pending" },
    { id: "BK-9043", client: "Alpha Media Hub", eventName: "Product Launch Expo", date: "2026-07-05", amount: "RS.62,000", status: "Confirmed" },
    { id: "BK-9044", client: "David Miller", eventName: "Charity Gala Dinner", date: "2026-07-12", amount: "RS.31,000", status: "Cancelled" },
    { id: "BK-9045", client: "FinTech Global", eventName: "Executive Retreat", date: "2026-07-19", amount: "RS.50,000", status: "Pending" }
  ]);

  const [recentActivities, setRecentActivities] = useState([
    { action: "Santhosh approved vendor contract", event: "Summer Fest", time: "Just now" },
    { action: "Payment received from Vortex Media", event: "Q2 services", time: "45 minutes ago" },
    { action: "Inventory Alert: Audio-visual stock low", event: "Mangalore Fest", time: "2 hours ago" },
  ]);

  // Modal & Interactive Action States
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ name: "", date: "", venue: "", status: "Planning" });
  const [auditLoading, setAuditLoading] = useState(false);
  const [clientFilter, setClientFilter] = useState("All");
  const [bookingFilter, setBookingFilter] = useState("All");
  const [reportDownloading, setReportDownloading] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  // System Settings State
  const [settings, setSettings] = useState({
    emailNotifications: true,
    twoFactor: false,
    systemMaintenance: false
  });

  // Authentication Guard
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // Trigger brief simulation spinner layout swap on Bookings tab load
  useEffect(() => {
    if (activeTab === "bookings") {
      setBookingLoading(true);
      const timer = setTimeout(() => setBookingLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/admin-login");
  };

  // Feature: Event CRUD Actions
  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents(events.map(ev => ev.id === editingEvent.id ? { ...editingEvent } : ev));
      logActivity(`Updated event "${editingEvent.name}"`, editingEvent.venue);
      setEditingEvent(null);
    } else {
      const created = { ...newEvent, id: Date.now() };
      setEvents([...events, created]);
      logActivity(`Created new event "${created.name}"`, created.venue);
      setNewEvent({ name: "", date: "", venue: "", status: "Planning" });
    }
    setIsEventModalOpen(false);
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setIsEventModalOpen(true);
  };

  const logActivity = (action, eventDetail) => {
    setRecentActivities([{ action, event: eventDetail, time: "Just now" }, ...recentActivities]);
  };

  // Feature: Vendor Logistics Auto-Audit Trigger
  const runAutoAudit = () => {
    setAuditLoading(true);
    setTimeout(() => {
      setAuditLoading(false);
      alert("System Audit completed! Remaining pending client records processed and synchronized successfully.");
      logActivity("Executed automated system infrastructure audit", "Vendor Logistics Management");
    }, 2000);
  };

  // Feature: Payment Status Toggle
  const togglePaymentStatus = (id) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: p.status === "Paid" ? "Pending" : "Paid" } : p));
    logActivity(`Changed status of invoice ${id}`, "Payment Processing");
  };

  // Feature: Booking Clearance Status Mutation 
  const handleBookingStatusChange = (id, newStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    logActivity(`Mutated Transaction State of ${id} to ${newStatus}`, "Ingestion Buffer Framework");
  };

  // Feature: Report Generation & Document Download Simulator
  const generateReport = (reportName) => {
    setReportDownloading(reportName);
    setTimeout(() => {
      setReportDownloading(null);

      const dataString = `Report,GeneratedAt,Status\n${reportName},${new Date().toISOString()},Success`;
      const blob = new Blob([dataString], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', `${reportName.toLowerCase().replace(/\s+/g, '_')}_export.csv`);
      a.click();

      logActivity(`Generated and exported analytical document: ${reportName}`, "Data Exports");
    }, 1500);
  };

  // Dashboard Statistics Object mappings
  const dashboardStats = {
    totalEvents: events.length + 1479,
    upcomingEvents: events.filter(e => e.status === "Confirmed").length + 154,
    revenueThisMonth: "2.48M",
    revenueGrowth: "+24.5%",
    staffAvailability: [
      { role: "Field Technicians", available: 84, total: 90 },
      { role: "Event Coordinators", available: 12, total: 15 },
      { role: "Support Crew", available: 218, total: 260 },
    ],
    vendorStatus: { activeContracts: 42, pendingAudit: auditLoading ? 0 : 3, nextAudit: "Oct 15" },
    pendingPayments: payments.filter(p => p.status === "Pending").length + 6,
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

  const filteredBookings = bookings.filter(b => bookingFilter === "All" ? true : b.status === bookingFilter);

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased">

      {/* SIDEBAR */}
      <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white transition-all duration-300 flex flex-col z-20`}>
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className="text-2xl font-bold text-amber-400 tracking-wider">EMS</h1>
              <p className="text-xs text-gray-400">Event Management System</p>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-gray-700">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { id: "overview", label: "Dashboard", icon: Calendar },
            { id: "events", label: "Manage Events", icon: Calendar },
            { id: "clients", label: "Manage Clients", icon: Users },
            { id: "staff", label: "Staff & Vendors", icon: Users },
            { id: "bookings", label: "Bookings", icon: Clock },
            { id: "payments", label: "Payments", icon: DollarSign },
            { id: "reports", label: "Reports", icon: TrendingUp },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id ? "bg-amber-600 text-white shadow-md font-medium" : "text-gray-400 hover:bg-gray-700 hover:text-white"}`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-red-600 hover:text-white rounded-lg transition-colors">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* HEADER BAR */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 capitalize">
              {activeTab === "overview" ? "Dashboard Overview" : activeTab.replace(/([A-Z])/g, ' $1')}
            </h2>
            <p className="text-gray-500 text-sm">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="font-semibold text-gray-900">{localStorage.getItem("adminEmail") || "admin@ems.com"}</p>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
              A
            </div>
          </div>
        </div>

        {/* INNER SCROLLABLE CONTENT MODULE */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">

          {/* TAB 1: OVERVIEW COMPONENT */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Events</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{dashboardStats.totalEvents}</p>
                    </div>
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-500"><Calendar size={24} /></div>
                  </div>
                  <p className="text-green-600 text-sm mt-4 font-medium">↑ 12% from last month</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Upcoming Events</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{dashboardStats.upcomingEvents}</p>
                    </div>
                    <div className="bg-purple-50 p-2 rounded-lg text-purple-500"><Clock size={24} /></div>
                  </div>
                  <p className="text-gray-600 text-sm mt-4">Current Month Status</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Revenue (Q3)</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">₹{dashboardStats.revenueThisMonth}</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded-lg text-green-500"><DollarSign size={24} /></div>
                  </div>
                  <p className="text-green-600 text-sm mt-4 font-medium">{dashboardStats.revenueGrowth} Growth</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Pending Invoices</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{dashboardStats.pendingPayments}</p>
                    </div>
                    <div className="bg-red-50 p-2 rounded-lg text-red-500"><AlertCircle size={24} /></div>
                  </div>
                  <p className="text-red-600 text-sm mt-4 font-medium">Action Needed</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Analytics Trend</h3>
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="month" tickLine={false} />
                        <YAxis tickLine={false} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} activeDot={{ r: 6 }} name="Actual Net Revenue" />
                        <Line type="monotone" dataKey="target" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" name="Projected Targets" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Event Types Distribution</h3>
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={eventDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                          {eventDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Staff Allocations Matrix</h3>
                  <div className="w-full h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dashboardStats.staffAvailability}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="role" tickLine={false} />
                        <YAxis tickLine={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="available" fill="#3b82f6" name="Active / Deployable" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="total" fill="#e5e7eb" name="Total Roster Pool" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">Vendor Automated Logistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-blue-50/60 rounded-lg border border-blue-100">
                      <span className="text-gray-600 text-sm font-medium">Active Structural Vendor Contracts</span>
                      <span className="font-bold text-blue-700">{dashboardStats.vendorStatus.activeContracts} Verified</span>
                    </div>
                    <div className="flex justify-between p-3 bg-orange-50/60 rounded-lg border border-orange-100">
                      <span className="text-gray-600 text-sm font-medium">Pending Processing Compliance Audits</span>
                      <span className="font-bold text-orange-700">{dashboardStats.vendorStatus.pendingAudit} Items</span>
                    </div>
                  </div>
                  <button
                    onClick={runAutoAudit}
                    disabled={auditLoading}
                    className="w-full mt-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2.5 rounded-lg font-semibold shadow-sm hover:from-amber-600 hover:to-amber-700 flex items-center justify-center transition-all"
                  >
                    {auditLoading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={18} /> Analyzing Infrastructure Indexes...
                      </>
                    ) : "Execute Ecosystem Infrastructure Audit"}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
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
          )}

          {/* TAB 2: EVENTS WORKSPACE SECTION WITH MODAL BUILDER */}
          {activeTab === "events" && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Enterprise Scheduled Contexts</h3>
                  <p className="text-sm text-gray-500">Full operational lifecycle state modifications</p>
                </div>
                <button
                  onClick={() => { setEditingEvent(null); setIsEventModalOpen(true); }}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all shadow-sm"
                >
                  <Plus size={18} /> <span>Create Event Entry</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm">Event Definition</th>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm">Target Execution Date</th>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm">Physical Venue Location</th>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm">Status Vector</th>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {events.map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{event.name}</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{event.date}</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{event.venue}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${event.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-right">
                          <button onClick={() => handleEditClick(event)} className="text-amber-600 hover:text-amber-800 font-semibold underline decoration-2 mr-4">
                            Modify
                          </button>
                          <button
                            onClick={() => { setEvents(events.filter(e => e.id !== event.id)); logActivity(`Deleted event registry entry: ${event.name}`, "Database Purge"); }}
                            className="text-red-600 hover:text-red-800 font-semibold"
                          >
                            Purge
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CLIENT ROUTER COMPONENT */}
          {activeTab === "clients" && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">B2B Account Portals</h3>
                  <p className="text-sm text-gray-500 font-normal">Active contractual pipelines parameters</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 font-medium">Compliance Sort:</span>
                  <select
                    value={clientFilter}
                    onChange={(e) => setClientFilter(e.target.value)}
                    className="border border-gray-300 rounded-md p-1.5 text-sm font-medium bg-white outline-none focus:border-amber-500"
                  >
                    <option value="All">All Profiles</option>
                    <option value="Active">Active Clearance</option>
                    <option value="Inactive">Suspended / Archival</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {clients.filter(c => clientFilter === "All" ? true : c.status === clientFilter).map((client, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-gray-900 text-lg">{client.name}</p>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${client.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                          {client.status}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mt-2 font-medium">Aggregated Retained Metrics: {client.events} Production Projects</p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
                      <button
                        onClick={() => {
                          const updatedStatus = client.status === "Active" ? "Inactive" : "Active";
                          setClients(clients.map(c => c.name === client.name ? { ...c, status: updatedStatus } : c));
                          logActivity(`Toggled Account State for ${client.name}`, "Security Profile Changes");
                        }}
                        className="text-xs text-amber-600 hover:text-amber-800 font-bold tracking-wider uppercase"
                      >
                        Change Status Clearance
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ROSTER AND HUMAN RESOURCES */}
          {activeTab === "staff" && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Personnel Availability Metrics</h3>
              <p className="text-sm text-gray-500 mb-6">Real-time deployments configurations indexes</p>
              <div className="space-y-5">
                {dashboardStats.staffAvailability.map((staff, idx) => {
                  const percentage = Math.round((staff.available / staff.total) * 100);
                  return (
                    <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{staff.role}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3 overflow-hidden">
                          <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                      <div className="sm:text-right flex-shrink-0">
                        <p className="font-extrabold text-gray-900 text-lg">{staff.available} / {staff.total}</p>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-0.5">{percentage}% Optimization Range</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: BOOKINGS REAL-TIME SYSTEM MONITOR - FULLY FUNCTIONAL DYNAMIC GRID */}
          {activeTab === "bookings" && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              {bookingLoading ? (
                /* Dynamic simulated pipeline sync animation */
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Ingestion Buffer</h3>
                  <p className="text-sm text-gray-500 mb-6">Live visual monitoring array streams</p>
                  <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                    <Loader2 className="animate-spin text-amber-500 mb-4" size={36} />
                    <p className="font-semibold text-gray-800 text-base">Polling Upstream API Connection Gateways...</p>
                    <p className="text-gray-400 text-xs mt-1">Data refreshes dynamically every 5000ms sandbox context</p>
                  </div>
                </div>
              ) : (
                /* Loaded Operational State Context Grid View */
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-gray-100 mb-6 gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Real-Time Ingestion Buffer</h3>
                      <p className="text-sm text-gray-500">Live visual monitoring array streams</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 font-medium">Clearance:</span>
                      <select
                        value={bookingFilter}
                        onChange={(e) => setBookingFilter(e.target.value)}
                        className="border border-gray-300 rounded-md p-1.5 text-sm font-medium bg-white outline-none focus:border-amber-500 cursor-pointer"
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
                          <th className="py-3.5 px-4">Client Entity</th>
                          <th className="py-3.5 px-4">Event Context</th>
                          <th className="py-3.5 px-4">Target Date</th>
                          <th className="py-3.5 px-4">Valuation</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4 text-right">Actions Matrix</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                        {filteredBookings.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center py-8 text-gray-400 font-medium bg-gray-50/20">
                              No active transactional records found matching this clearance filter.
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
                                <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${item.status === 'Confirmed' ? 'bg-green-100 text-green-800 border-green-200' :
                                  item.status === 'Pending' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                                    'bg-red-100 text-red-800 border-red-200'
                                  }`}>
                                  {item.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {item.status !== 'Confirmed' && (
                                    <button
                                      onClick={() => handleBookingStatusChange(item.id, 'Confirmed')}
                                      className="px-2 py-1 text-xs font-bold text-green-700 bg-green-50 border border-green-200 rounded hover:bg-green-100 transition-colors"
                                    >
                                      Confirm
                                    </button>
                                  )}
                                  {item.status !== 'Pending' && (
                                    <button
                                      onClick={() => handleBookingStatusChange(item.id, 'Pending')}
                                      className="px-2 py-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded hover:bg-amber-100 transition-colors"
                                    >
                                      Hold
                                    </button>
                                  )}
                                  {item.status !== 'Cancelled' && (
                                    <button
                                      onClick={() => handleBookingStatusChange(item.id, 'Cancelled')}
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
                </div>
              )}
            </div>
          )}

          {/* TAB 6: LEDGER PAYMENTS INTERACTIVE COMPONENT */}
          {activeTab === "payments" && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Accounting Infrastructure Hub</h3>
              <p className="text-sm text-gray-500 mb-6">Interactive click line items below to toggle invoice clearance state parameters</p>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm">Invoice ID Reference</th>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm">Financial Valuation Statement</th>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm">Accounting State Ledger</th>
                      <th className="px-6 py-3.5 font-semibold text-gray-700 text-sm text-right">Interactions Matrix</th>
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
                            Mark as {payment.status === "Paid" ? "Unpaid / Pending" : "Cleared / Paid"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: LIVE EXPORT FILE GENERATION EXECUTOR */}
          {activeTab === "reports" && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Analytical Compiler Interface</h3>
              <p className="text-sm text-gray-500 mb-6">Triggers local file system download payloads using active system logs state context</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Revenue Report",
                  "Event Analytics",
                  "Staff Performance",
                  "Vendor Report",
                ].map((report, idx) => (
                  <button
                    key={idx}
                    onClick={() => generateReport(report)}
                    disabled={reportDownloading !== null}
                    className="p-5 border border-gray-200 rounded-xl hover:border-amber-500 text-left transition-all hover:shadow-sm flex justify-between items-center bg-white group disabled:opacity-50"
                  >
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors">{report}</p>
                      <p className="text-xs text-gray-400 mt-1">Structured Schema Matrix .CSV payload</p>
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
          )}

          {/* TAB 8: SYSTEM SETTINGS SCHEMATICS */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 max-w-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Core System Controls</h3>
              <p className="text-sm text-gray-500 mb-6">Configure high-level dashboard parameters and runtime toggles</p>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Email Event Logs</p>
                    <p className="text-xs text-gray-400 mt-0.5">Dispatches daily automated data backups to operators</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Two-Factor Authentication (2FA)</p>
                    <p className="text-xs text-gray-400 mt-0.5">Enforces strict biometric checks during admin login sweeps</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.twoFactor}
                    onChange={(e) => setSettings({ ...settings, twoFactor: e.target.checked })}
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* MODAL CONFIGURATOR PANEL CONTAINER */}
      {isEventModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4 border border-gray-100">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h4 className="text-lg font-bold text-gray-900">
                {editingEvent ? "Modify Event Registry Profile" : "Initialize New Event Sequence"}
              </h4>
              <button onClick={() => setIsEventModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Event Reference Identifier</label>
                <input
                  type="text"
                  required
                  value={editingEvent ? editingEvent.name : newEvent.name}
                  onChange={(e) => editingEvent ? setEditingEvent({ ...editingEvent, name: e.target.value }) : setNewEvent({ ...newEvent, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-amber-500 bg-gray-50"
                  placeholder="e.g. Bangalore Corporate Meet"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Target Date</label>
                  <input
                    type="date"
                    required
                    value={editingEvent ? editingEvent.date : newEvent.date}
                    onChange={(e) => editingEvent ? setEditingEvent({ ...editingEvent, date: e.target.value }) : setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-amber-500 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Initial Status</label>
                  <select
                    value={editingEvent ? editingEvent.status : newEvent.status}
                    onChange={(e) => editingEvent ? setEditingEvent({ ...editingEvent, status: e.target.value }) : setNewEvent({ ...newEvent, status: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-amber-500 bg-gray-50"
                  >
                    <option value="Planning">Planning</option>
                    <option value="Confirmed">Confirmed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Physical Location Venue</label>
                <input
                  type="text"
                  required
                  value={editingEvent ? editingEvent.venue : newEvent.venue}
                  onChange={(e) => editingEvent ? setEditingEvent({ ...editingEvent, venue: e.target.value }) : setNewEvent({ ...newEvent, venue: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-amber-500 bg-gray-50"
                  placeholder="e.g. Skyline Convention Hall"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-100 rounded-lg transition-all"
                >
                  Abort
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-all"
                >
                  Commit Entry
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