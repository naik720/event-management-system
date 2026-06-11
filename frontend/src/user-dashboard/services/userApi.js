const API_BASE_URL = "http://localhost:5000";

export const getEvents = async () => {
  const response = await fetch(`${API_BASE_URL}/api/events`);
  if (!response.ok) {
    throw new Error("Unable to load events");
  }
  return response.json();
};

export const getVenues = async () => {
  const response = await fetch(`${API_BASE_URL}/api/venues`);
  if (!response.ok) {
    throw new Error("Unable to load venues");
  }
  const data = await response.json();
  return data.venues || [];
};

export const createVenueBooking = async (bookingData) => {
  const response = await fetch(`${API_BASE_URL}/api/venue-bookings/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    throw new Error("Unable to create booking");
  }

  return response.json();
};

export const getBookings = async (userId) => {
  const url = userId
    ? `${API_BASE_URL}/api/venue-bookings/user/${userId}/bookings`
    : `${API_BASE_URL}/api/bookings`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Unable to load bookings");
  }
  return response.json();
};

export const getAllVenueBookings = async () => {
  const response = await fetch(`${API_BASE_URL}/api/venue-bookings`);
  if (!response.ok) {
    throw new Error("Unable to load venue bookings");
  }
  return response.json();
};

export const updateBookingStatus = async (bookingId, updates) => {
  const response = await fetch(`${API_BASE_URL}/api/venue-bookings/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Unable to update booking status");
  }

  return response.json();
};
