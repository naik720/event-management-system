import React from "react";

const bookings = [
  {
    event: "Wedding Ceremony",
    date: "May 30, 2026 · 10:00 AM",
    venue: "Royal Banquet Hall",
    status: "Confirmed",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=140&q=80",
  },
  {
    event: "Tech Conference 2026",
    date: "Jun 10, 2026 · 09:00 AM",
    venue: "Grand Conference Center",
    status: "Confirmed",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=140&q=80",
  },
  {
    event: "Birthday Party",
    date: "Jun 15, 2026 · 05:00 PM",
    venue: "Sunset Outdoor Venue",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=140&q=80",
  },
  {
    event: "Corporate Meeting",
    date: "Jun 20, 2026 · 02:00 PM",
    venue: "City Auditorium",
    status: "Confirmed",
    image: "https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=140&q=80",
  },
  {
    event: "Reception Party",
    date: "Jun 25, 2026 · 07:00 PM",
    venue: "Dream Wedding Hall",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=140&q=80",
  },
];

const UpcomingBookings = () => {
  return (
    <section className="venue-card upcoming-bookings">
      <div className="venue-card-header">
        <h2>Upcoming Bookings</h2>
        <button type="button">View All</button>
      </div>

      <div className="booking-mini-list">
        {bookings.map((booking) => (
          <article key={booking.event}>
            <img src={booking.image} alt={booking.event} />
            <div>
              <strong>{booking.event}</strong>
              <p>{booking.date}</p>
              <small>{booking.venue}</small>
            </div>
            <span className={booking.status === "Confirmed" ? "confirmed" : "pending"}>
              {booking.status}
            </span>
          </article>
        ))}
      </div>

      <button type="button" className="venue-wide-button">View All Bookings</button>
    </section>
  );
};

export default UpcomingBookings;
