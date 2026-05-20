import React, { useEffect, useState } from "react";
import axios from "axios";

function Events() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:5000/api/events");
    setEvents(res.data);
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-5">

      <h1 className="text-center text-5xl font-bold mb-16 text-gray-800">
        Popular Events
      </h1><div className="grid md:grid-cols-3 gap-10">

        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:scale-105 duration-300"
          >
            <img
              src={event.image}
              alt=""
              className="h-64 w-full object-cover"
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                {event.title}
              </h2>

              <p className="text-gray-500 mb-3">
                {event.location}
              </p><p className="text-pink-500 font-bold text-2xl">
                ₹{event.price}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Events;