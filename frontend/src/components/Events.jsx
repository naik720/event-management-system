import React, { useEffect, useState } from "react";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");

      // Safety check: Handle both raw arrays or data wrapped in an object
      const data = Array.isArray(res.data) ? res.data : res.data.events || [];
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load events from server.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-xl text-gray-500">Loading amazing events...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-xl text-red-500">{error}</div>;
  }

  return (
    <section id="events" className="max-w-7xl mx-auto py-10 px-5">
      {/* If database is empty, show a helpful message instead of a blank space */}
      {events.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">No events found in your MongoDB Atlas database.</p>
          <p className="text-sm text-pink-500 mt-2 font-medium">Insert a document into your Atlas 'events' collection to see it here!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {events.map((event) => (
            <div
              key={event._id || event.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:scale-105 duration-300 border border-gray-100"
            >
              <img
                // 1. Checks if a string exists, otherwise places a reliable live fallback image link
                src={event.image && event.image.trim() !== "" ? event.image : "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"}
                alt={event.title || "Event Showcase"}
                className="h-64 w-full object-cover"
                onError={(e) => {
                  // 2. Real-time protection: If the link fails or times out, swap in this live backup link instantly
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {event.title}
                </h2>
                <p className="text-gray-500 mb-3 flex items-center gap-1">
                  📍 {event.location}
                </p>
                <p className="text-pink-500 font-bold text-2xl">
                  ₹{event.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Events;