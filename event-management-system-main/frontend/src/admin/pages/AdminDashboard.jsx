import React, { useEffect, useState } from "react";
import AddVendor from "../vendor-management/pages/AddVendor";
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
  Search,
  Edit3,
  Trash2,
  Loader2,
  Briefcase,
  ShieldCheck,
  Coffee,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";

// Existing Module Components
import VenueDashboard from "../venue-management/pages/VenueDashboard";
import AddVenue from "../venue-management/pages/AddVenue";
import AllVenues from "../venue-management/pages/AllVenues";
import VenueBookings from "../venue-management/pages/VenueBookings";
import MaintenanceRecords from "../venue-management/pages/MaintenanceRecords";
import SeatingArrangements from "../venue-management/pages/SeatingArrangements";
import VenueDetails from "../venue-management/pages/VenueDetails";
import AvailabilityCalendar from "../venue-management/pages/AvailabilityCalendar";
import BillingDashboard from "../venue-management/pages/BillingDashboard";

// --- RE-INTEGRATED EVENT MANAGEMENT MODULE INFRASTRUCTURE PAGES ---
import EventDashboard from "../../pages/events/EventDashboard";
import EventsPage from "../../pages/events/EventsPage";
import EventDetails from "../../pages/events/EventDetails";
import ResourcesPage from "../../pages/events/ResourcesPage";
import EventCategory from "../../pages/events/EventCategory";
import CalendarPage from "../../pages/events/CalendarPage";
import HelpCentre from "../../pages/events/HelpCentre";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Navigation Accordion Toggles
  const [venueOpen, setVenueOpen] = useState(location.pathname.startsWith("/admin/venue-management"));
  const [eventMgmtOpen, setEventMgmtOpen] = useState(false);

  const [staffSubTab, setStaffSubTab] = useState("staff-management");
  const [isAddStaff, setIsAddStaff] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [staffSearch, setStaffSearch] = useState("");
  const [staffStatusFilter, setStaffStatusFilter] = useState("All");
  const [staffErrors, setStaffErrors] = useState({});
  const [newStaffMember, setNewStaffMember] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Event Manager",
    status: "Active",
  });
  const [staffMembers, setStaffMembers] = useState([
    { id: 1, initials: "RS", name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210", role: "Event Manager", status: "Active", assignedEvents: 2 },
    { id: 2, initials: "PV", name: "Priya Verma", email: "priya@gmail.com", phone: "9123456780", role: "Coordinator", status: "Active", assignedEvents: 3 },
    { id: 3, initials: "AS", name: "Amit Singh", email: "amit@gmail.com", phone: "9988776655", role: "Security Staff", status: "On Duty", assignedEvents: 1 },
    { id: 4, initials: "NG", name: "Neha Gupta", email: "neha@gmail.com", phone: "8899887766", role: "Catering Staff", status: "On Leave", assignedEvents: 1 },
    { id: 5, initials: "RP", name: "Rohit Patel", email: "rohit@gmail.com", phone: "7766554433", role: "Decorator", status: "Active", assignedEvents: 2 },
  ]);
  const [vendorSearch, setVendorSearch] = useState("");
  const [vendorStatusFilter, setVendorStatusFilter] = useState("All");
  const [vendors, setVendors] = useState([
    { id: 1, initials: "FP", name: "Food Palace", category: "Catering", phone: "9088776655", email: "contact@foodpalace.com", contractStatus: "Active", assignedEvents: 2 },
    { id: 2, initials: "DD", name: "Dream Decorators", category: "Decoration", phone: "8877665544", email: "info@dreamdecor.com", contractStatus: "Active", assignedEvents: 3 },
    { id: 3, initials: "SS", name: "SnapStudio", category: "Photography", phone: "7766554433", email: "hello@snapstudio.com", contractStatus: "Active", assignedEvents: 2 },
    { id: 4, initials: "SW", name: "Sound Wala", category: "Sound & Lighting", phone: "6655443322", email: "support@soundwala.com", contractStatus: "Active", assignedEvents: 1 },
    { id: 5, initials: "PP", name: "Party Props", category: "Decoration", phone: "9988665544", email: "sales@partyprops.com", contractStatus: "Expired", assignedEvents: 0 },
  ]);
  const [vendorEditingId, setVendorEditingId] = useState(null);
  const [vendorDraft, setVendorDraft] = useState(null);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin-login");
    }
  }, [navigate]);

  useEffect(() => {
    if (location.pathname.startsWith("/admin/venue-management")) {
      setVenueOpen(true);
      if (Object.keys(eventSubviewsMap).includes(activeTab)) {
        setActiveTab("overview");
      }
    } else {
      setVenueOpen(false);
    }

    if (location.pathname.startsWith("/admin/vendor-management")) {
      setActiveTab("staff");
      setStaffSubTab("vendor-management");
    }

    if (location.pathname === "/admin" || location.pathname === "/admin/dashboard") {
      if (!Object.keys(eventSubviewsMap).includes(activeTab)) {
        setActiveTab("overview");
      }
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
    { key: "billing", label: "Billing Dashboard" },
  ];

  const eventManagementMenu = [
    { key: "event-dashboard", label: "Workspace Matrix" },
    { key: "events-hub", label: "Events Hub" },
    { key: "event-details", label: "Event Details" },
    { key: "resources", label: "Allocation Resources" },
    { key: "categories", label: "Classifications" },
    { key: "calendar", label: "Scheduler View" },
    { key: "help-centre", label: "Info Centre" },
  ];

  const getVendorInitials = (name) =>
    name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0] || "")
      .join("")
      .toUpperCase()
      .slice(0, 2) || "NV";

  const buildVendorRecord = (vendorData, existingVendor = null) => ({
    id: existingVendor?.id || Date.now(),
    initials: getVendorInitials(vendorData.vendorName || existingVendor?.name || "New Vendor"),
    name: vendorData.vendorName || existingVendor?.name || "New Vendor",
    category: vendorData.category || existingVendor?.category || "Catering",
    phone: vendorData.phone || "",
    email: vendorData.email || "",
    address: vendorData.address || existingVendor?.address || "",
    contactPerson: vendorData.contactPerson || existingVendor?.contactPerson || "",
    contractStartDate: vendorData.contractStartDate || existingVendor?.contractStartDate || "",
    contractEndDate: vendorData.contractEndDate || existingVendor?.contractEndDate || "",
    contractStatus: vendorData.status || existingVendor?.contractStatus || "Active",
    status: vendorData.status || existingVendor?.status || "Active",
    assignedEvents: existingVendor?.assignedEvents ?? 0,
  });

  const validateStaffMember = () => {
    const nextErrors = {};
    const emailValue = newStaffMember.email.trim();
    const phoneValue = newStaffMember.phone.trim();
    const passwordValue = newStaffMember.password.trim();

    if (!newStaffMember.name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (!emailValue) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      nextErrors.email = "Please enter a valid email address";
    } else if (
      staffMembers.some(
        (member) => member.email.toLowerCase() === emailValue.toLowerCase() && member.id !== editingStaffId
      )
    ) {
      nextErrors.email = "Email already exists";
    }

    if (!phoneValue) {
      nextErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(phoneValue)) {
      nextErrors.phone = "Phone number must be 10 digits";
    } else if (
      staffMembers.some((member) => member.phone.trim() === phoneValue && member.id !== editingStaffId)
    ) {
      nextErrors.phone = "Phone number already exists";
    }

    if (!passwordValue && !editingStaffId) {
      nextErrors.password = "Password must be at least 6 characters";
    } else if (passwordValue && passwordValue.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    return nextErrors;
  };

  const handleStaffSave = () => {
    const nextErrors = validateStaffMember();
    setStaffErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (editingStaffId) {
      setStaffMembers((current) =>
        current.map((member) =>
          member.id === editingStaffId
            ? {
              ...member,
              name: newStaffMember.name.trim(),
              email: newStaffMember.email.trim(),
              phone: newStaffMember.phone.trim(),
              password: newStaffMember.password.trim() || member.password || "",
              role: newStaffMember.role,
              status: newStaffMember.status,
              initials: newStaffMember.name
                .split(" ")
                .map((word) => word[0] || "")
                .join("")
                .toUpperCase()
                .slice(0, 2),
            }
            : member
        )
      );
      setEditingStaffId(null);
    } else {
      const initials = newStaffMember.name
        .split(" ")
        .map((word) => word[0] || "")
        .join("")
        .toUpperCase();
      setStaffMembers((current) => [
        ...current,
        {
          id: Date.now(),
          initials: initials.slice(0, 2),
          name: newStaffMember.name.trim(),
          email: newStaffMember.email.trim(),
          phone: newStaffMember.phone.trim(),
          password: newStaffMember.password.trim(),
          role: newStaffMember.role,
          status: newStaffMember.status,
          assignedEvents: 0,
        },
      ]);
    }

    setNewStaffMember({ name: "", email: "", phone: "", password: "", role: "Event Manager", status: "Active" });
    setStaffErrors({});
    setIsAddStaff(false);
  };

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
    "/admin/venue-management/billing": "Billing Dashboard",
  };

  const eventSubviewsMap = {
    "event-dashboard": "Event Management Workspace Matrix",
    "events-hub": "Event Management Events Hub",
    "event-details": "Event Management Details Summary",
    "resources": "Event Management Resource Allocation",
    "categories": "Event Management Classifications",
    "calendar": "Event Management Scheduler Calendar",
    "help-centre": "Event Management Information Centre",
  };

  const pageTitle = location.pathname.startsWith("/admin/venue-management") || location.pathname.startsWith("/admin/vendor-management")
    ? routeTitles[location.pathname] || (location.pathname.startsWith("/admin/vendor-management") ? "Vendor Management" : "Venue Management")
    : eventSubviewsMap[activeTab]
      ? eventSubviewsMap[activeTab]
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
        className={`${sidebarOpen ? "w-64" : "w-20"
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

        {/* --- SIDEBAR LIST VIEW SCROLL LAYER OVERWRITE --- */}
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">

          {/* Main Core Links Group */}
          <button
            onClick={() => {
              setActiveTab("overview");
              navigate("/admin/dashboard");
            }}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${activeTab === "overview" && !location.pathname.startsWith("/admin/venue-management") && !Object.keys(eventSubviewsMap).includes(activeTab)
              ? "bg-amber-600 text-white"
              : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
          >
            <Calendar size={20} />
            {sidebarOpen && <span>Dashboard</span>}
          </button>

          <button
            onClick={() => {
              setActiveTab("events");
              navigate("/admin/dashboard");
            }}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${activeTab === "events"
              ? "bg-amber-600 text-white"
              : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
          >
            <Calendar size={20} />
            {sidebarOpen && <span>Manage Events</span>}
          </button>

          <button
            onClick={() => {
              setActiveTab("clients");
              navigate("/admin/dashboard");
            }}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${activeTab === "clients"
              ? "bg-amber-600 text-white"
              : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
          >
            <Users size={20} />
            {sidebarOpen && <span>Manage Clients</span>}
          </button>

          {/* Staff & Vendors Accordion dropdown */}
          <React.Fragment>
            <button
              onClick={() => {
                setActiveTab("staff");
                setStaffSubTab("staff-management");
                navigate("/admin/dashboard");
              }}
              className={`w-full flex items-center justify-between space-x-3 px-4 py-2.5 rounded-lg transition-colors ${activeTab === "staff" && !location.pathname.startsWith("/admin/venue-management")
                ? "bg-amber-600 text-white"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
            >
              <div className="flex items-center space-x-3">
                <Users size={20} />
                {sidebarOpen && <span>Staff & Vendors</span>}
              </div>
              {sidebarOpen && <span className="ml-auto">{activeTab === "staff" ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>}
            </button>
            {sidebarOpen && activeTab === "staff" && (
              <div className="ml-4 mt-1 space-y-1 border-l border-gray-700 pl-3">
                <button
                  onClick={() => {
                    setActiveTab("staff");
                    setStaffSubTab("staff-management");
                    navigate("/admin/dashboard");
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${staffSubTab === "staff-management" ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"}`}
                >
                  Staff Management
                </button>
                <button
                  onClick={() => {
                    setActiveTab("staff");
                    setStaffSubTab("vendor-management");
                    setVendorDraft(null);
                    setVendorEditingId(null);
                    navigate("/admin/vendor-management/overview");
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${location.pathname.startsWith("/admin/vendor-management") || staffSubTab === "vendor-management"
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                >
                  Vendor Management
                </button>
              </div>
            )}
          </React.Fragment>

          {/* --- MODULE HEADER --- */}
          {sidebarOpen && <div className="px-4 text-xs font-bold uppercase tracking-wider text-gray-500 pt-4">Modules</div>}

          {/* --- RE-ARRANGED: EVENT MANAGEMENT MAIN SIDEBAR ENTRY COMPONENT --- */}
          <React.Fragment>
            <button
              onClick={() => {
                setEventMgmtOpen((v) => !v);
                setActiveTab("event-dashboard");
                navigate("/admin/dashboard");
              }}
              className={`w-full flex items-center justify-between space-x-3 px-4 py-3 rounded-lg transition-colors ${Object.keys(eventSubviewsMap).includes(activeTab)
                ? "bg-amber-600 text-white"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
            >
              <div className="flex items-center space-x-3">
                <LayoutDashboard size={20} />
                {sidebarOpen && <span>Event Dashboard</span>}
              </div>
              {sidebarOpen && <span className="ml-auto">{eventMgmtOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>}
            </button>
            {sidebarOpen && eventMgmtOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-gray-700 pl-3">
                {eventManagementMenu.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setActiveTab(item.key);
                      navigate("/admin/dashboard");
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === item.key
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </React.Fragment>

          {/* Venue Management Dropdown Section link */}
          <React.Fragment>
            <button
              onClick={() => {
                setVenueOpen((v) => !v);
                navigate("/admin/venue-management/overview");
              }}
              className={`w-full flex items-center justify-between space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname.startsWith("/admin/venue-management")
                ? "bg-amber-600 text-white"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
            >
              <div className="flex items-center space-x-3">
                <Store size={20} />
                {sidebarOpen && <span>Venue Management</span>}
              </div>
              {sidebarOpen && <span className="ml-auto">{venueOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>}
            </button>
            {sidebarOpen && venueOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-gray-700 pl-3">
                {venueMenu.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => navigate(`/admin/venue-management/${item.key}`)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${location.pathname === `/admin/venue-management/${item.key}`
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </React.Fragment>

          {/* Utilities Bottom Section options */}
          <div className="space-y-2 border-t border-gray-700 pt-4">
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
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${activeTab === item.id && !location.pathname.startsWith("/admin/venue-management")
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
          {/* --- CONDITIONAL SUBSYSTEM ROUTER OVERRIDES FOR ISOLATED TABS --- */}
          {activeTab === "event-dashboard" ? (
            <div className="ems-tailwind-isolate"><EventDashboard /></div>
          ) : activeTab === "events-hub" ? (
            <div className="ems-tailwind-isolate"><EventsPage /></div>
          ) : activeTab === "event-details" ? (
            <div className="ems-tailwind-isolate"><EventDetails /></div>
          ) : activeTab === "resources" ? (
            <div className="ems-tailwind-isolate"><ResourcesPage /></div>
          ) : activeTab === "categories" ? (
            <div className="ems-tailwind-isolate"><EventCategory /></div>
          ) : activeTab === "calendar" ? (
            <div className="ems-tailwind-isolate"><CalendarPage /></div>
          ) : activeTab === "help-centre" ? (
            <div className="ems-tailwind-isolate"><HelpCentre /></div>
          ) : location.pathname === "/admin/venue-management/overview" ? (
            <VenueDashboard />
          ) : location.pathname === "/admin/venue-management/add-venue" ? (
            <AddVenue />
          ) : location.pathname === "/admin/vendor-management/add-vendor" ? (
            <AddVendor
              initialVendor={vendorDraft}
              existingVendors={vendors}
              editingVendorId={vendorEditingId}
              onSave={(vendorData) => {
                setVendors((current) => {
                  const existingVendor = current.find((vendor) => vendor.id === vendorEditingId);
                  const nextVendor = buildVendorRecord(vendorData, existingVendor || vendorDraft);
                  if (existingVendor) {
                    return current.map((vendor) => (vendor.id === existingVendor.id ? nextVendor : vendor));
                  }
                  return [...current, nextVendor];
                });
                setVendorDraft(null);
                setVendorEditingId(null);
                navigate("/admin/vendor-management/overview");
              }}
              onCancel={() => {
                setVendorDraft(null);
                setVendorEditingId(null);
                navigate("/admin/vendor-management/overview");
              }}
              saveLabel={vendorEditingId ? "Update Vendor" : "Save Vendor"}
              title={vendorEditingId ? "Edit Vendor" : "Add Vendor"}
            />
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
          ) : location.pathname === "/admin/venue-management/billing" ? (
            <BillingDashboard />
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
                  <p className="text-green-600 text-sm mt-4">&uarr; 12% from last month</p>
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
            staffSubTab === "staff-management" ? (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Staff Management</h3>
                      <p className="text-sm text-gray-500 mt-1">Manage your organization staff members</p>
                    </div>
                    <button
                      onClick={() => {
                        setStaffSubTab("staff-management");
                        setIsAddStaff(true);
                        setEditingStaffId(null);
                        setStaffErrors({});
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-[#5b2ceb] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#4e25b5] transition-all"
                    >
                      <Plus size={16} />
                      Add Staff
                    </button>
                  </div>

                  {isAddStaff ? (
                    <div className="grid gap-6 xl:grid-cols-3">
                      <div className="xl:col-span-2 space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{editingStaffId ? "Edit Staff" : "Add Staff"}</h3>
                            <p className="text-sm text-gray-500">{editingStaffId ? "Update staff member information." : "Create a new staff member and assign their role."}</p>
                          </div>
                          <button
                            onClick={() => {
                              setIsAddStaff(false);
                              setEditingStaffId(null);
                              setStaffErrors({});
                              setNewStaffMember({ name: "", email: "", phone: "", password: "", role: "Event Manager", status: "Active" });
                            }}
                            className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                          >
                            &larr; Back
                          </button>
                        </div>

                        <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Add Staff Form</h4>
                          <div className="grid gap-4 lg:grid-cols-2">
                            <div>
                              <label className="text-sm font-semibold text-gray-700">Name <span className="text-red-500">*</span></label>
                              <input
                                type="text"
                                required
                                value={newStaffMember.name}
                                onChange={(e) => {
                                  setNewStaffMember((current) => ({ ...current, name: e.target.value }));
                                  setStaffErrors((current) => ({ ...current, name: "" }));
                                }}
                                placeholder="Enter full name"
                                className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#7b5cff] focus:ring-2 focus:ring-[#ede8ff] ${staffErrors.name ? "border-red-400" : "border-gray-200"
                                  }`}
                              />
                              {staffErrors.name && <p className="mt-2 text-xs font-medium text-red-600">{staffErrors.name}</p>}
                            </div>
                            <div>
                              <label className="text-sm font-semibold text-gray-700">Password <span className="text-red-500">*</span></label>
                              <input
                                type="password"
                                required={!editingStaffId}
                                value={newStaffMember.password}
                                onChange={(e) => {
                                  setNewStaffMember((current) => ({ ...current, password: e.target.value }));
                                  setStaffErrors((current) => ({ ...current, password: "" }));
                                }}
                                placeholder="Enter password"
                                className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#7b5cff] focus:ring-2 focus:ring-[#ede8ff] ${staffErrors.password ? "border-red-400" : "border-gray-200"
                                  }`}
                              />
                              {staffErrors.password && <p className="mt-2 text-xs font-medium text-red-600">{staffErrors.password}</p>}
                            </div>
                            <div>
                              <label className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></label>
                              <input
                                type="email"
                                required
                                value={newStaffMember.email}
                                onChange={(e) => {
                                  setNewStaffMember((current) => ({ ...current, email: e.target.value }));
                                  setStaffErrors((current) => ({ ...current, email: "" }));
                                }}
                                placeholder="Enter email address"
                                className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#7b5cff] focus:ring-2 focus:ring-[#ede8ff] ${staffErrors.email ? "border-red-400" : "border-gray-200"
                                  }`}
                              />
                              {staffErrors.email && <p className="mt-2 text-xs font-medium text-red-600">{staffErrors.email}</p>}
                            </div>
                            <div>
                              <label className="text-sm font-semibold text-gray-700">Status <span className="text-red-500">*</span></label>
                              <select
                                required
                                value={newStaffMember.status}
                                onChange={(e) => setNewStaffMember((current) => ({ ...current, status: e.target.value }))}
                                className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#7b5cff] focus:ring-2 focus:ring-[#ede8ff]"
                              >
                                <option value="Active">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="On Duty">On Duty</option>
                                <option value="On Leave">On Leave</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-sm font-semibold text-gray-700">Phone <span className="text-red-500">*</span></label>
                              <input
                                type="tel"
                                inputMode="numeric"
                                maxLength={10}
                                required
                                value={newStaffMember.phone}
                                onChange={(e) => {
                                  setNewStaffMember((current) => ({ ...current, phone: e.target.value }));
                                  setStaffErrors((current) => ({ ...current, phone: "" }));
                                }}
                                placeholder="Enter phone number"
                                className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#7b5cff] focus:ring-2 focus:ring-[#ede8ff] ${staffErrors.phone ? "border-red-400" : "border-gray-200"
                                  }`}
                              />
                              {staffErrors.phone && <p className="mt-2 text-xs font-medium text-red-600">{staffErrors.phone}</p>}
                            </div>
                            <div>
                              <label className="text-sm font-semibold text-gray-700">Role <span className="text-red-500">*</span></label>
                              <select
                                required
                                value={newStaffMember.role}
                                onChange={(e) => {
                                  setNewStaffMember((current) => ({ ...current, role: e.target.value }));
                                }}
                                className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#7b5cff] focus:ring-2 focus:ring-[#ede8ff]"
                              >
                                <option value="Event Manager">Select Role</option>
                                <option value="Event Manager">Event Manager</option>
                                <option value="Coordinator">Coordinator</option>
                                <option value="Security Staff">Security Staff</option>
                                <option value="Catering Staff">Catering Staff</option>
                                <option value="Decorator">Decorator</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddStaff(false);
                              setEditingStaffId(null);
                              setStaffErrors({});
                              setNewStaffMember({ name: "", email: "", phone: "", password: "", role: "Event Manager", status: "Active" });
                            }}
                            className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleStaffSave}
                            className="rounded-full bg-[#5b2ceb] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#4e25b5] transition-colors"
                          >
                            {editingStaffId ? "Update Staff" : "Save Staff"}
                          </button>
                        </div>
                      </div>

                      <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6 shadow-sm">
                        <div className="mb-6">
                          <h3 className="text-lg font-bold text-gray-900">Staff Roles Information</h3>
                          <p className="text-sm text-gray-500">Quick reference to staff roles and responsibilities.</p>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-start gap-4 rounded-3xl bg-white p-4 shadow-sm">
                            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eef2ff] text-[#5b2ceb]">
                              <Briefcase size={20} />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Event Manager</p>
                              <p className="text-sm text-gray-500">Manage overall event planning and execution.</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 rounded-3xl bg-white p-4 shadow-sm">
                            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#ecfdf5] text-[#10b981]">
                              <Users size={20} />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Coordinator</p>
                              <p className="text-sm text-gray-500">Coordinate between teams and manage schedules.</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 rounded-3xl bg-white p-4 shadow-sm">
                            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eff6ff] text-[#2563eb]">
                              <ShieldCheck size={20} />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Security Staff</p>
                              <p className="text-sm text-gray-500">Ensure event security and safety.</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 rounded-3xl bg-white p-4 shadow-sm">
                            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fff7ed] text-[#f97316]">
                              <Coffee size={20} />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Catering Staff</p>
                              <p className="text-sm text-gray-500">Handle catering and food arrangements.</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 rounded-3xl bg-white p-4 shadow-sm">
                            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fce7f3] text-[#d946ef]">
                              <Sparkles size={20} />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Decorator</p>
                              <p className="text-sm text-gray-500">Manage decoration and venue setup.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                          <p className="text-sm font-medium text-gray-500">Total Staff</p>
                          <p className="mt-4 text-3xl font-bold text-gray-900">{staffMembers.length}</p>
                          <p className="text-xs text-gray-400 mt-2">All Staff Members</p>
                        </div>
                        <div className="rounded-3xl border border-gray-200 bg-emerald-50 p-6 shadow-sm">
                          <p className="text-sm font-medium text-emerald-700">Active Staff</p>
                          <p className="mt-4 text-3xl font-bold text-emerald-900">{staffMembers.filter((member) => member.status === "Active").length}</p>
                          <p className="text-xs text-emerald-600 mt-2">Currently Active</p>
                        </div>
                        <div className="rounded-3xl border border-gray-200 bg-sky-50 p-6 shadow-sm">
                          <p className="text-sm font-medium text-sky-700">On Duty</p>
                          <p className="mt-4 text-3xl font-bold text-sky-900">{staffMembers.filter((member) => member.status === "On Duty").length}</p>
                          <p className="text-xs text-sky-600 mt-2">Currently On Duty</p>
                        </div>
                        <div className="rounded-3xl border border-gray-200 bg-orange-50 p-6 shadow-sm">
                          <p className="text-sm font-medium text-orange-700">On Leave</p>
                          <p className="mt-4 text-3xl font-bold text-orange-900">{staffMembers.filter((member) => member.status === "On Leave").length}</p>
                          <p className="text-xs text-orange-600 mt-2">Currently On Leave</p>
                        </div>
                        <div className="rounded-3xl border border-gray-200 bg-pink-50 p-6 shadow-sm">
                          <p className="text-sm font-medium text-pink-700">Inactive</p>
                          <p className="mt-4 text-3xl font-bold text-pink-900">{staffMembers.filter((member) => member.status === "Inactive").length}</p>
                          <p className="text-xs text-pink-600 mt-2">Inactive Staff</p>
                        </div>
                      </div>

                      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">Staff List</h4>
                            <p className="text-sm text-gray-500">Search and manage your staff members</p>
                          </div>
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-3">
                              <Search size={18} className="text-gray-400" />
                              <input
                                type="text"
                                value={staffSearch}
                                onChange={(e) => setStaffSearch(e.target.value)}
                                placeholder="Search staff by name, role..."
                                className="w-full bg-transparent text-sm text-gray-700 outline-none"
                              />
                            </div>
                            <select
                              value={staffStatusFilter}
                              onChange={(e) => setStaffStatusFilter(e.target.value)}
                              className="rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none"
                            >
                              <option value="All">All Status</option>
                              <option value="Active">Active</option>
                              <option value="On Duty">On Duty</option>
                              <option value="On Leave">On Leave</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                            <button className="rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                              <Calendar size={18} />
                            </button>
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="min-w-full text-left text-sm text-gray-700">
                            <thead className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
                              <tr>
                                <th className="px-4 py-4">#</th>
                                <th className="px-4 py-4">Name</th>
                                <th className="px-4 py-4">Email</th>
                                <th className="px-4 py-4">Phone</th>
                                <th className="px-4 py-4">Role</th>
                                <th className="px-4 py-4">Status</th>
                                <th className="px-4 py-4">Assigned Events</th>
                                <th className="px-4 py-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                              {staffMembers
                                .filter((member) =>
                                  member.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
                                  member.role.toLowerCase().includes(staffSearch.toLowerCase())
                                )
                                .filter((member) =>
                                  staffStatusFilter === "All" ? true : member.status === staffStatusFilter
                                )
                                .map((member, index) => (
                                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-4 font-semibold text-gray-900">{index + 1}</td>
                                    <td className="px-4 py-4 flex items-center gap-3">
                                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ede8ff] text-sm font-semibold text-[#5b2ceb]">
                                        {member.initials}
                                      </div>
                                      <div>
                                        <p className="font-semibold text-gray-900">{member.name}</p>
                                      </div>
                                    </td>
                                    <td className="px-4 py-4 text-gray-600">{member.email}</td>
                                    <td className="px-4 py-4 text-gray-600">{member.phone}</td>
                                    <td className="px-4 py-4">
                                      <span className="rounded-full bg-[#f3f0ff] px-3 py-1 text-xs font-semibold text-[#5b2ceb]">
                                        {member.role}
                                      </span>
                                    </td>
                                    <td className="px-4 py-4">
                                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${member.status === "Active"
                                        ? "bg-emerald-100 text-emerald-800"
                                        : member.status === "On Duty"
                                          ? "bg-sky-100 text-sky-800"
                                          : member.status === "On Leave"
                                            ? "bg-orange-100 text-orange-800"
                                            : "bg-gray-100 text-gray-700"
                                        }`}>
                                        {member.status}
                                      </span>
                                    </td>
                                    <td className="px-4 py-4 text-gray-700">{member.assignedEvents} Events</td>
                                    <td className="px-4 py-4 text-right space-x-2">
                                      <button
                                        onClick={() => {
                                          setNewStaffMember({
                                            name: member.name,
                                            email: member.email,
                                            phone: member.phone,
                                            password: "",
                                            role: member.role,
                                            status: member.status,
                                          });
                                          setEditingStaffId(member.id);
                                          setStaffErrors({});
                                          setIsAddStaff(true);
                                        }}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                                        title="Edit staff member"
                                      >
                                        <Edit3 size={16} />
                                      </button>
                                      <button
                                        onClick={() => {
                                          if (window.confirm(`Are you sure you want to delete ${member.name}?`)) {
                                            setStaffMembers((current) => current.filter((m) => m.id !== member.id));
                                          }
                                        }}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                                        title="Delete staff member"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Vendor Management</h3>
                      <p className="text-sm text-gray-500 mt-1">Manage your organization vendors and service providers</p>
                    </div>
                    <button
                      onClick={() => {
                        setVendorDraft(null);
                        setVendorEditingId(null);
                        navigate("/admin/vendor-management/add-vendor");
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-[#5b2ceb] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#4e25b5] transition-all"
                    >
                      <Plus size={16} />
                      Add Vendor
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                      <p className="text-sm font-medium text-gray-500">Total Vendors</p>
                      <p className="mt-4 text-3xl font-bold text-gray-900">{vendors.length}</p>
                      <p className="text-xs text-gray-400 mt-2">All Vendors</p>
                    </div>
                    <div className="rounded-3xl border border-gray-200 bg-emerald-50 p-6 shadow-sm">
                      <p className="text-sm font-medium text-emerald-700">Active Vendors</p>
                      <p className="mt-4 text-3xl font-bold text-emerald-900">{vendors.filter((v) => v.contractStatus === "Active").length}</p>
                      <p className="text-xs text-emerald-600 mt-2">Currently Active</p>
                    </div>
                    <div className="rounded-3xl border border-gray-200 bg-sky-50 p-6 shadow-sm">
                      <p className="text-sm font-medium text-sky-700">Total Categories</p>
                      <p className="mt-4 text-3xl font-bold text-gray-900">{new Set(vendors.map((v) => v.category)).size}</p>
                      <p className="text-xs text-sky-600 mt-2">Vendor Categories</p>
                    </div>
                    <div className="rounded-3xl border border-gray-200 bg-orange-50 p-6 shadow-sm">
                      <p className="text-sm font-medium text-orange-700">Contracts Expiring</p>
                      <p className="mt-4 text-3xl font-bold text-orange-900">3</p>
                      <p className="text-xs text-orange-600 mt-2">Next 30 Days</p>
                    </div>
                    <div className="rounded-3xl border border-gray-200 bg-pink-50 p-6 shadow-sm">
                      <p className="text-sm font-medium text-pink-700">Total Payments (This Month)</p>
                      <p className="mt-4 text-3xl font-bold text-pink-900">&#8377;8,75,000</p>
                      <p className="text-xs text-pink-600 mt-2">All Vendor Payments</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Vendor List</h4>
                      <p className="text-sm text-gray-500">Search and manage your vendors</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-3">
                        <Search size={18} className="text-gray-400" />
                        <input
                          type="text"
                          value={vendorSearch}
                          onChange={(e) => setVendorSearch(e.target.value)}
                          placeholder="Search vendor by name, category..."
                          className="w-full bg-transparent text-sm text-gray-700 outline-none"
                        />
                      </div>
                      <select
                        value={vendorStatusFilter}
                        onChange={(e) => setVendorStatusFilter(e.target.value)}
                        className="rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none"
                      >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Expired">Expired</option>
                      </select>
                      <button className="rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <Calendar size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm text-gray-700">
                      <thead className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
                        <tr>
                          <th className="px-4 py-4">#</th>
                          <th className="px-4 py-4">Vendor Name</th>
                          <th className="px-4 py-4">Category</th>
                          <th className="px-4 py-4">Phone</th>
                          <th className="px-4 py-4">Email</th>
                          <th className="px-4 py-4">Contract Status</th>
                          <th className="px-4 py-4">Assigned Events</th>
                          <th className="px-4 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white">
                        {vendors
                          .filter((vendor) =>
                            vendor.name.toLowerCase().includes(vendorSearch.toLowerCase()) ||
                            vendor.category.toLowerCase().includes(vendorSearch.toLowerCase())
                          )
                          .filter((vendor) =>
                            vendorStatusFilter === "All" ? true : vendor.contractStatus === vendorStatusFilter
                          )
                          .map((vendor, index) => (
                            <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-4 font-semibold text-gray-900">{index + 1}</td>
                              <td className="px-4 py-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ede8ff] text-sm font-semibold text-[#5b2ceb]">
                                  {vendor.initials}
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900">{vendor.name}</p>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <span className="rounded-full bg-[#f3f0ff] px-3 py-1 text-xs font-semibold text-[#5b2ceb]">
                                  {vendor.category}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-gray-600">{vendor.phone}</td>
                              <td className="px-4 py-4 text-gray-600">{vendor.email}</td>
                              <td className="px-4 py-4">
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${vendor.contractStatus === "Active"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-red-100 text-red-800"
                                  }`}>
                                  {vendor.contractStatus}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-gray-700">{vendor.assignedEvents} Events</td>
                              <td className="px-4 py-4 text-right space-x-2">
                                <button
                                  onClick={() => {
                                    setVendorDraft(vendor);
                                    setVendorEditingId(vendor.id);
                                    navigate("/admin/vendor-management/add-vendor");
                                  }}
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                                  title="Edit vendor"
                                >
                                  <Edit3 size={16} />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Are you sure you want to delete ${vendor.name}?`)) {
                                      setVendors((current) => current.filter((v) => v.id !== vendor.id));
                                    }
                                  }}
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                                  title="Delete vendor"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )
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