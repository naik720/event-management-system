import React, { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import Sidebar from "../components/Sidebar";
import { getBookings } from "../services/userApi";
import "../styles/dashboard.css";

const fallbackBookings = [
  {
    id: "BK-2026-001",
    title: "Music Concert 2026",
    date: "May 25, 2026",
    time: "7:00 PM",
    location: "Auditorium Hall, New York",
    status: "Confirmed",
    amount: 320,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "BK-2026-002",
    title: "Tech Conference",
    date: "Jun 10, 2026",
    time: "9:00 AM",
    location: "Tech Park, New York",
    status: "Pending",
    amount: 450,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "BK-2026-003",
    title: "Design Workshop",
    date: "Jun 18, 2026",
    time: "2:00 PM",
    location: "Creative Hub, New York",
    status: "Confirmed",
    amount: 180,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "BK-2026-004",
    title: "Food Festival 2026",
    date: "Jul 05, 2026",
    time: "6:00 PM",
    location: "Central Park, New York",
    status: "Cancelled",
    amount: 150,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "BK-2026-005",
    title: "Sports Event Live",
    date: "Jun 20, 2026",
    time: "8:00 PM",
    location: "Stadium Arena, New York",
    status: "Confirmed",
    amount: 280,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=500&q=80",
  },
];

const tabs = ["All Bookings", "Upcoming", "Completed", "Pending", "Cancelled"];

const quickActions = [
  { label: "Browse Events", icon: CalendarDays },
  { label: "Payment History", icon: WalletCards },
  { label: "Download Invoices", icon: Download },
  { label: "Need Help?", icon: HelpCircle },
];

const bookingStatusColors = {
  Confirmed: "#22c55e",
  Pending: "#f59e0b",
  Completed: "#3b82f6",
  Cancelled: "#ef4444",
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("All Bookings");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBookings()
      .then(setBookings)
      .catch(() => setBookings(fallbackBookings))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const searchText = searchTerm.trim().toLowerCase();
      const matchesTab =
        activeTab === "All Bookings" ||
        booking.status === activeTab ||
        (activeTab === "Upcoming" && booking.status === "Confirmed");
      const matchesSearch =
        booking.title.toLowerCase().includes(searchText) ||
        booking.id.toLowerCase().includes(searchText) ||
        booking.location.toLowerCase().includes(searchText);

      return matchesTab && matchesSearch;
    });
  }, [bookings, activeTab, searchTerm]);

  const counts = useMemo(() => {
    const confirmed = bookings.filter((booking) => booking.status === "Confirmed").length;
    const pending = bookings.filter((booking) => booking.status === "Pending").length;
    const completed = bookings.filter((booking) => booking.status === "Completed").length || 2;
    const cancelled = bookings.filter((booking) => booking.status === "Cancelled").length;

    return {
      total: bookings.length + 3,
      confirmed,
      pending,
      completed,
      cancelled,
    };
  }, [bookings]);

  const chartData = [
    { name: "Confirmed", value: 4, color: bookingStatusColors.Confirmed },
    { name: "Pending", value: 2, color: bookingStatusColors.Pending },
    { name: "Completed", value: 2, color: bookingStatusColors.Completed },
    { name: "Cancelled", value: 0, color: bookingStatusColors.Cancelled },
  ];

  const statCards = [
    { label: "Total Bookings", value: "08", helper: "All time bookings", icon: CalendarDays, tone: "orange" },
    { label: "Upcoming Events", value: "04", helper: "Confirmed bookings", icon: Ticket, tone: "green" },
    { label: "Pending Confirmation", value: "02", helper: "Awaiting confirmation", icon: Clock3, tone: "purple" },
    { label: "Completed Events", value: "02", helper: "Successfully completed", icon: CheckCircle2, tone: "blue" },
    { label: "Cancelled Events", value: "00", helper: "Cancelled bookings", icon: XCircle, tone: "red" },
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
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                alt="John Doe"
              />
              <div>
                <strong>John Doe</strong>
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
                <article className="booking-row-card" key={booking.id}>
                  <img src={booking.image} alt={booking.title} />

                  <div className="booking-main-info">
                    <h3>{booking.title}</h3>
                    <div className="booking-row-meta">
                      <span>
                        <CalendarDays size={14} />
                        {booking.date}
                      </span>
                      <span>
                        <Clock3 size={14} />
                        {booking.time}
                      </span>
                      <span>
                        <MapPin size={14} />
                        {booking.location}
                      </span>
                    </div>
                  </div>

                  <div className="booking-id-block">
                    <span className={`booking-state state-${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                    <p>Booking ID</p>
                    <strong>{booking.id}</strong>
                  </div>

                  <div className="booking-amount">
                    <p>Total Amount</p>
                    <strong>${booking.amount.toFixed(2)}</strong>
                  </div>

                  <div className="booking-row-actions">
                    <button type="button">View Details</button>
                    <MoreVertical size={18} />
                  </div>
                </article>
              ))}
            </div>
          </section>

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
