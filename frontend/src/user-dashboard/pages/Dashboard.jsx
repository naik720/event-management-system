import React, { useEffect, useMemo, useState } from "react";
import {
  Bell,
  MessageSquare,
  Ticket,
  WalletCards,
} from "lucide-react";

import Sidebar from "../styles/components/Sidebar";
import Topbar from "../styles/components/Topbar";
import StatsCard from "../styles/components/StatsCard";
import EventCard from "../styles/components/EventCard";
import QuickActions from "../styles/components/QuickActions";
import BookingCard from "../styles/components/BookingCard";
import { DEFAULT_EVENT_IMAGE } from "../styles/components/imageFallback";
import { getClientDisplayName, getCurrentClient } from "../services/clientSession";
import { getBookings } from "../services/userApi";

import "../styles/dashboard.css";

const SectionHeader = ({ title }) => (
  <div className="section-header">
    <h2>{title}</h2>
    <button type="button">View All</button>
  </div>
);

const Dashboard = () => {
  const currentClient = getCurrentClient();
  const clientName = getClientDisplayName(currentClient);
  const [bookings, setBookings] = useState([]);
  const userId = currentClient.id || currentClient._id || currentClient.userId || "";

  useEffect(() => {
    getBookings(userId)
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch(() => setBookings([]));
  }, [userId]);

  const stats = useMemo(() => {
    const approved = bookings.filter((b) => b.status === "Approved").length;
    const total = bookings.length;
    return {
      bookedEvents: approved,
      totalBookings: total,
      notificationCount: Math.max(total, 1),
    };
  }, [bookings]);

  const upcomingEvents = useMemo(
    () => bookings.filter((b) => b.status === "Approved").slice(0, 3),
    [bookings]
  );

  const bookingImageFor = (booking, index = 0) => {
    if (booking?.image) return booking.image;

    const imageMap = {
      wedding: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
      birthday: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80",
      corporate: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
      conference: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
      concert: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
      exhibition: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    };

    const eventType = (booking?.eventType || booking?.eventTitle || "").toLowerCase();
    const matchedImage = Object.entries(imageMap).find(([key]) => eventType.includes(key));
    if (matchedImage) return matchedImage[1];

    return [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    ][index % 3];
  };

  const recentBookings = useMemo(
    () => bookings.slice(0, 3),
    [bookings]
  );

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
            <StatsCard icon={Ticket} number={stats.bookedEvents.toString()} title="Approved Bookings" tone="orange" />
            <StatsCard icon={WalletCards} number={stats.totalBookings.toString()} title="Total Bookings" tone="green" />
            <StatsCard icon={Bell} number={stats.notificationCount.toString()} title="Event Notifications" tone="blue" />
            <StatsCard icon={MessageSquare} number="02" title="Feedback Status" tone="red" />
          </div>
        </section>

        <div className="dashboard-grid">
          <section className="panel upcoming-panel">
            <SectionHeader title="Upcoming Approved Events" />

            <div className="vertical-list">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <EventCard
                    key={event._id || event.eventTitle}
                    image={event.image || bookingImageFor(event)}
                    title={event.eventTitle}
                    date={event.eventDate}
                    location={event.location}
                    compact
                    tag="Approved"
                  />
                ))
              ) : (
                <p style={{ padding: "20px" }}>No approved events yet.</p>
              )}
            </div>
          </section>

          <section className="panel">
            <SectionHeader title="Recent Bookings" />

            <div className="vertical-list">
              {recentBookings.length > 0 ? (
                recentBookings.map((booking, index) => (
                  <BookingCard
                    key={booking._id || booking.eventTitle}
                    image={booking.image || bookingImageFor(booking, index)}
                    title={booking.eventTitle}
                    date={booking.eventDate}
                    location={booking.location}
                    status={booking.status}
                  />
                ))
              ) : (
                <p style={{ padding: "20px" }}>No bookings yet. Create your first booking!</p>
              )}
            </div>
          </section>

          <section className="panel recommended-panel">
            <SectionHeader title="Recommended For You" />

            <div className="recommendation-grid">
              {recommendedEvents.map((event) => (
                <EventCard key={event.title} {...event} image={event.image || DEFAULT_EVENT_IMAGE} />
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
