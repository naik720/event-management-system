const API_BASE_URL = "http://localhost:5000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

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

export const getUserBilling = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/api/payments/user/${userId || "guest"}`);
  if (!response.ok) {
    throw new Error("Unable to load billing records");
  }
  return response.json();
};

export const getBillingDashboard = async () => {
  const response = await fetch(`${API_BASE_URL}/api/payments/dashboard`);
  if (!response.ok) {
    throw new Error("Unable to load billing dashboard");
  }
  return response.json();
};

export const createInvoice = async (bookingId, baseAmount) => {
  const response = await fetch(`${API_BASE_URL}/api/payments/invoices/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ bookingId, baseAmount }),
  });

  if (!response.ok) {
    throw new Error("Unable to generate invoice");
  }

  return response.json();
};

export const createRazorpayOrder = async (invoiceId) => {
  const response = await fetch(`${API_BASE_URL}/api/payments/razorpay/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ invoiceId }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Unable to create Razorpay order");
  }

  return response.json();
};

export const verifyRazorpayPayment = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/payments/razorpay/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Unable to verify payment");
  }

  return response.json();
};

export const recordCashPayment = async (invoiceId, notes = "") => {
  const response = await fetch(`${API_BASE_URL}/api/payments/cash`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ invoiceId, notes }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Unable to record cash payment");
  }

  return response.json();
};

export const getInvoicePdfUrl = (invoiceId) => `${API_BASE_URL}/api/payments/invoices/${invoiceId}/pdf`;
