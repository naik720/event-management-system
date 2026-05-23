const API_BASE_URL = "http://localhost:5000";

export const getEvents = async () => {
  const response = await fetch(`${API_BASE_URL}/api/events`);

  if (!response.ok) {
    throw new Error("Unable to load events");
  }

  return response.json();
};

export const getBookings = async () => {
  const response = await fetch(`${API_BASE_URL}/api/bookings`);

  if (!response.ok) {
    throw new Error("Unable to load bookings");
  }

  return response.json();
};
