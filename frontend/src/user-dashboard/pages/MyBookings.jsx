import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  HelpCircle,
  MapPin,
  MoreVertical,
  Search,
  Settings,
  Ticket,
  WalletCards,
  XCircle,
  X as CloseIcon,
  Users,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import Sidebar from "../styles/components/Sidebar";
import { getClientDisplayName, getClientPhoto, getCurrentClient } from "../services/clientSession";
import { createInvoice, getBookings, getInvoicePdfUrl, getUserBilling } from "../services/userApi";
import "../styles/dashboard.css";

const fallbackBookings = [
  {
    id: "BK-2026-001",
    eventTitle: "Music Concert 2026",
    eventType: "Concert",
    venueName: "Auditorium Hall",
    eventDate: "May 25, 2026",
    location: "New York",
    status: "Approved",
    guests: 120,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "BK-2026-002",
    eventTitle: "Tech Conference",
    eventType: "Conference",
    venueName: "Tech Park",
    eventDate: "Jun 10, 2026",
    location: "New York",
    status: "Pending",
    guests: 220,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "BK-2026-003",
    eventTitle: "Design Workshop",
    eventType: "Workshop",
    venueName: "Creative Hub",
    eventDate: "Jun 18, 2026",
    location: "New York",
    status: "Approved",
    guests: 80,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "BK-2026-004",
    eventTitle: "Food Festival 2026",
    eventType: "Festival",
    venueName: "Central Park",
    eventDate: "Jul 05, 2026",
    location: "New York",
    status: "Rejected",
    guests: 200,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "BK-2026-005",
    eventTitle: "Sports Event Live",
    eventType: "Sport",
    venueName: "Stadium Arena",
    eventDate: "Jun 20, 2026",
    location: "New York",
    status: "Approved",
    guests: 320,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=500&q=80",
  },
];

const tabs = ["All Bookings", "Pending", "Approved", "Rejected"];

const quickActions = [
  { label: "Browse Events", icon: CalendarDays },
  { label: "Payment History", icon: WalletCards },
  { label: "Download Invoices", icon: Download },
  { label: "Need Help?", icon: HelpCircle },
];

const bookingStatusColors = {
  Approved: "#22c55e",
  Pending: "#f59e0b",
  Rejected: "#ef4444",
};

const MyBookings = () => {
  const navigate = useNavigate();
  const currentClient = getCurrentClient();
  const clientName = getClientDisplayName(currentClient);
  const clientPhoto = getClientPhoto(currentClient);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("All Bookings");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBookingForDetail, setSelectedBookingForDetail] = useState(null);
  const [billingInvoices, setBillingInvoices] = useState([]);
  const [billingMessage, setBillingMessage] = useState("");
  const userId = currentClient.id || currentClient._id || currentClient.userId || "";

  useEffect(() => {
    getBookings(userId)
      .then((data) => setBookings(data.length ? data : fallbackBookings))
      .catch(() => setBookings(fallbackBookings))
      .finally(() => setIsLoading(false));
  }, [userId]);

  useEffect(() => {
    getUserBilling(userId || "guest")
      .then((data) => setBillingInvoices(data.invoices || []))
      .catch(() => setBillingInvoices([]));
  }, [userId]);

  const getInvoiceForBooking = (booking) => {
    const bookingId = booking?._id || booking?.id;
    return billingInvoices.find((invoice) => String(invoice.bookingId) === String(bookingId));
  };

  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(value) || 0);

  const handleProceedToPayment = async (booking) => {
    try {
      setBillingMessage("");
      let invoice = getInvoiceForBooking(booking);
      if (!invoice) {
        invoice = await createInvoice(booking._id || booking.id, booking.amount);
        setBillingInvoices((current) => [invoice, ...current]);
      }
      navigate(`/client/payments?invoice=${invoice._id}`);
    } catch {
      setBillingMessage("Unable to generate invoice for this booking right now.");
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const searchText = searchTerm.trim().toLowerCase();
      const matchesTab =
        activeTab === "All Bookings" ||
        booking.status === activeTab;
      const matchesSearch =
        (booking.eventTitle || booking.title || "").toLowerCase().includes(searchText) ||
        (booking.venueName || booking.location || "").toLowerCase().includes(searchText) ||
        (booking.eventType || "").toLowerCase().includes(searchText);

      return matchesTab && matchesSearch;
    });
  }, [bookings, activeTab, searchTerm]);

  const counts = useMemo(() => {
    const approved = bookings.filter((booking) => booking.status === "Approved").length;
    const pending = bookings.filter((booking) => booking.status === "Pending").length;
    const rejected = bookings.filter((booking) => booking.status === "Rejected").length;

    return {
      total: bookings.length,
      approved,
      pending,
      rejected,
    };
  }, [bookings]);

  const chartData = [
    { name: "Approved", value: counts.approved || 0, color: bookingStatusColors.Approved },
    { name: "Pending", value: counts.pending || 0, color: bookingStatusColors.Pending },
    { name: "Rejected", value: counts.rejected || 0, color: bookingStatusColors.Rejected },
  ];

  const statCards = [
    { label: "Total Bookings", value: counts.total.toString(), helper: "All bookings", icon: CalendarDays, tone: "orange" },
    { label: "Approved", value: counts.approved.toString(), helper: "Confirmed by admin", icon: CheckCircle2, tone: "green" },
    { label: "Pending", value: counts.pending.toString(), helper: "Awaiting review", icon: Clock3, tone: "purple" },
    { label: "Rejected", value: counts.rejected.toString(), helper: "Not approved", icon: XCircle, tone: "red" },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content bookings-content">
        <header className="bookings-topbar">
          <div className="page-title-row">
            <button type="button" className="icon-only" aria-label="Open menu">
              <Ticket size={19} />
            </button>
            <div>
              <h1>My Bookings</h1>
              <p>Manage all your event bookings and their details.</p>
            </div>
          </div>

          <div className="booking-header-actions">
            <div className="booking-search">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events, bookings..."
              />
              <Search size={17} />
            </div>
            <button type="button" className="icon-only notification-button" aria-label="Notifications">
              <Bell size={18} />
              <span>3</span>
            </button>
            <button type="button" className="icon-only" aria-label="Settings">
              <Settings size={18} />
            </button>
            <div className="booking-user">
              <img
                src={clientPhoto}
                alt={clientName}
              />
              <div>
                <strong>{clientName}</strong>
                <p>Client</p>
              </div>
            </div>
          </div>
        </header>

        <section className="booking-stats-grid">
          {statCards.map(({ label, value, helper, icon: Icon, tone }) => (
            <article className={`booking-stat-card booking-stat-${tone}`} key={label}>
              <span>
                <Icon size={22} />
              </span>
              <div>
                <h2>{value}</h2>
                <h3>{label}</h3>
                <p>{helper}</p>
              </div>
            </article>
          ))}
        </section>

        <div className="booking-page-grid">
          <section className="bookings-list-panel">
            <div className="booking-tabs">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab}
                  className={activeTab === tab ? "selected" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="booking-list">
              {isLoading && <p className="booking-empty">Loading bookings...</p>}

              {!isLoading && filteredBookings.length === 0 && (
                <p className="booking-empty">No bookings found.</p>
              )}

              {filteredBookings.map((booking) => (
                <article className="booking-row-card" key={booking.id || booking._id}>
                  <img
                    src={booking.image || "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80"}
                    alt={booking.eventTitle || booking.title || "Booking image"}
                  />

                  <div className="booking-main-info">
                    <h3>{booking.eventTitle || booking.title}</h3>
                    <div className="booking-row-meta">
                      <span>
                        <CalendarDays size={14} />
                        {booking.eventDate || booking.date}
                      </span>
                      <span>
                        <MapPin size={14} />
                        {booking.venueName || booking.location}
                      </span>
                      <span>
                        <Clock3 size={14} />
                        {booking.eventType || "Event"}
                      </span>
                    </div>
                  </div>

                  <div className="booking-id-block">
                    <span className={`booking-state state-${(booking.status || "pending").toLowerCase()}`}>
                      {booking.status}
                    </span>
                    <p>Booking ID</p>
                    <strong>{booking.id || booking._id || "N/A"}</strong>
                  </div>

                  <div className="booking-amount">
                    <p>{getInvoiceForBooking(booking) ? "Invoice Total" : "Guest Count"}</p>
                    <strong>{getInvoiceForBooking(booking) ? formatINR(getInvoiceForBooking(booking).totalAmount) : booking.guests || "—"}</strong>
                  </div>

                  <div className="booking-row-actions">
                    <button
                      type="button"
                      onClick={() => setSelectedBookingForDetail(booking)}
                    >
                      View Details
                    </button>
                    <MoreVertical size={18} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          {selectedBookingForDetail && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setSelectedBookingForDetail(null)}>
              <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-900">Booking Details</h2>
                  <button
                    type="button"
                    onClick={() => setSelectedBookingForDetail(null)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <CloseIcon size={24} />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {billingMessage && <p className="profile-save-message">{billingMessage}</p>}
                  <img
                    src={selectedBookingForDetail.image || "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80"}
                    alt={selectedBookingForDetail.eventTitle}
                    className="w-full h-64 object-cover rounded-2xl"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-xs uppercase tracking-widest text-slate-400">Event Name</p>
                      <p className="text-lg font-semibold text-slate-900 mt-2">{selectedBookingForDetail.eventTitle}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-xs uppercase tracking-widest text-slate-400">Event Type</p>
                      <p className="text-lg font-semibold text-slate-900 mt-2">{selectedBookingForDetail.eventType}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-xs uppercase tracking-widest text-slate-400">Venue</p>
                      <p className="text-lg font-semibold text-slate-900 mt-2">{selectedBookingForDetail.venueName}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-xs uppercase tracking-widest text-slate-400">Location</p>
                      <p className="text-lg font-semibold text-slate-900 mt-2">{selectedBookingForDetail.location}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-xs uppercase tracking-widest text-slate-400">Event Date</p>
                      <p className="text-lg font-semibold text-slate-900 mt-2">{selectedBookingForDetail.eventDate}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-xs uppercase tracking-widest text-slate-400">Expected Guests</p>
                      <p className="text-lg font-semibold text-slate-900 mt-2 flex items-center gap-2">
                        <Users size={18} />
                        {selectedBookingForDetail.guests}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs uppercase tracking-widest text-slate-400">Status</p>
                    <span className={`inline-block mt-2 rounded-full px-4 py-2 text-sm font-semibold ${
                      selectedBookingForDetail.status === "Approved"
                        ? "bg-emerald-100 text-emerald-700"
                        : selectedBookingForDetail.status === "Pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-rose-100 text-rose-700"
                    }`}>
                      {selectedBookingForDetail.status}
                    </span>
                  </div>

                  {selectedBookingForDetail.notes && (
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-xs uppercase tracking-widest text-slate-400">Special Requests</p>
                      <p className="text-slate-700 mt-2">{selectedBookingForDetail.notes}</p>
                    </div>
                  )}

                  <div className="rounded-2xl bg-slate-100 p-4">
                    <p className="text-xs uppercase tracking-widest text-slate-400">Booking ID</p>
                    <p className="text-lg font-mono font-semibold text-slate-900 mt-2">{selectedBookingForDetail.id || selectedBookingForDetail._id}</p>
                  </div>

                  {getInvoiceForBooking(selectedBookingForDetail) && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                      <p className="text-xs uppercase tracking-widest text-emerald-600">Invoice</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        {getInvoiceForBooking(selectedBookingForDetail).invoiceNumber}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {formatINR(getInvoiceForBooking(selectedBookingForDetail).totalAmount)} · {getInvoiceForBooking(selectedBookingForDetail).status}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedBookingForDetail(null)}
                      className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      Close
                    </button>
                    {selectedBookingForDetail.status === "Approved" && (
                      <button
                        type="button"
                        className="flex-1 rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700 transition"
                        onClick={() => handleProceedToPayment(selectedBookingForDetail)}
                      >
                        {getInvoiceForBooking(selectedBookingForDetail)?.status === "Paid" ? "View Payment" : "Proceed to Payment"}
                      </button>
                    )}
                    {getInvoiceForBooking(selectedBookingForDetail) && (
                      <button
                        type="button"
                        className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition"
                        onClick={() => window.open(getInvoicePdfUrl(getInvoiceForBooking(selectedBookingForDetail)._id), "_blank")}
                      >
                        Download Invoice
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <aside className="booking-side-panel">
            <section className="booking-overview-card">
              <h2>Booking Overview</h2>

              <div className="overview-chart">
                <ResponsiveContainer width="100%" height={190}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      innerRadius={52}
                      outerRadius={78}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {chartData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="chart-center">
                  <strong>{String(counts.total).padStart(2, "0")}</strong>
                  <span>Total</span>
                </div>
              </div>

              <div className="overview-legend">
                {chartData.map((item) => (
                  <div key={item.name}>
                    <span style={{ background: item.color }}></span>
                    <p>{item.name}</p>
                    <strong>
                      {item.value} ({Math.round((item.value / 8) * 100)}%)
                    </strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="booking-overview-card">
              <h2>Quick Actions</h2>
              <div className="booking-quick-actions">
                {quickActions.map(({ label, icon: Icon }) => (
                  <button type="button" key={label}>
                    <span>
                      <Icon size={17} />
                      {label}
                    </span>
                    <ChevronRight size={17} />
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default MyBookings;
