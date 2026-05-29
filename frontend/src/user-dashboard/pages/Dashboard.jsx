import React from "react";
import {
  Bell,
  MessageSquare,
  Ticket,
  WalletCards,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";
import EventCard from "../components/EventCard";
import QuickActions from "../components/QuickActions";
import BookingCard from "../components/BookingCard";
import { getClientDisplayName, getCurrentClient } from "../services/clientSession";

import "../styles/dashboard.css";

const upcomingEvents = [
  {
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=300&q=80",
    title: "Music Concert 2026",
    date: "May 25, 2026",
    location: "Auditorium Hall",
  },
  {
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=300&q=80",
    title: "Tech Conference",
    date: "Jun 10, 2026",
    location: "Tech Park, New York",
  },
  {
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=300&q=80",
    title: "Design Workshop",
    date: "Jun 18, 2026",
    location: "Creative Hub",
  },
];

const bookings = [
  { ...upcomingEvents[0], status: "Confirmed" },
  { ...upcomingEvents[1], status: "Confirmed" },
  { ...upcomingEvents[2], status: "Pending" },
];

const recommendedEvents = [
  {
    image: "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?auto=format&fit=crop&w=300&q=80",
    title: "Standup Comedy Night",
    date: "May 30, 2026",
    location: "City Theatre",
  },
  {
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=300&q=80",
    title: "Food Festival 2026",
    date: "Jun 05, 2026",
    location: "Central Park",
  },
  {
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=300&q=80",
    title: "Art Exhibition",
    date: "Jun 12, 2026",
    location: "Art Gallery",
  },
  {
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=300&q=80",
    title: "Sports Event Live",
    date: "Jun 20, 2026",
    location: "Stadium Arena",
  },
];

const SectionHeader = ({ title }) => (
  <div className="section-header">
    <h2>{title}</h2>
    <button type="button">View All</button>
  </div>
);

const Dashboard = () => {
  const currentClient = getCurrentClient();
  const clientName = getClientDisplayName(currentClient);

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <section className="summary-panel">
          <div className="welcome-box">
            <h2>Welcome back, {clientName}!</h2>
            <p>Manage your client profile, event requests, bookings, payments, notifications, and feedback.</p>
          </div>

          <div className="stats-grid">
            <StatsCard icon={Ticket} number="04" title="Booked Events" tone="orange" />
            <StatsCard icon={WalletCards} number="$320" title="Payment History" tone="green" />
            <StatsCard icon={Bell} number="06" title="Event Notifications" tone="blue" />
            <StatsCard icon={MessageSquare} number="02" title="Feedback Status" tone="red" />
          </div>
        </section>

        <div className="dashboard-grid">
          <section className="panel upcoming-panel">
            <SectionHeader title="Upcoming Events" />

            <div className="vertical-list">
              {upcomingEvents.map((event) => (
                <EventCard key={event.title} {...event} compact tag="Upcoming" />
              ))}
            </div>
          </section>

          <section className="panel">
            <SectionHeader title="Recent Bookings" />

            <div className="vertical-list">
              {bookings.map((booking) => (
                <BookingCard key={booking.title} {...booking} />
              ))}
            </div>
          </section>

          <section className="panel recommended-panel">
            <SectionHeader title="Recommended For You" />

            <div className="recommendation-grid">
              {recommendedEvents.map((event) => (
                <EventCard key={event.title} {...event} />
              ))}
            </div>
          </section>

          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
