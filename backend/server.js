const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const { OAuth2Client } = require("google-auth-library");

const connectDB = require("./config/db");

// =========================
// App Initialization
// =========================
const app = express();

// =========================
// Environment Config
// =========================
dotenv.config();

// =========================
// Database Connection
// =========================
connectDB();

// =========================
// Middleware
// =========================
app.use(cors());
app.use(express.json());

// =========================
// Routes
// =========================
app.use("/api/auth", require("./routes/auth"));

// =========================
// Event Schema
// =========================
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Upcoming",
  },
  image: {
    type: String,
  },
});

const Event = mongoose.model("Event", eventSchema);

// =========================
// Google OAuth Client
// =========================
const client = new OAuth2Client(
  "685762159805-5hrhspefo76lum330n5lk4eiuqhnq78p.apps.googleusercontent.com"
);

// =========================
// Background Images API
// =========================
const images = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
  "https://images.unsplash.com/photo-1511578314322-379afb476865",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
];

app.get("/api/images", (req, res) => {
  res.json(images);
});

// =========================
// Static Events Data
// =========================
const events = [
  {
    id: 1,
    title: "Music Concert 2026",
    category: "Music",
    date: "May 25, 2026",
    time: "7:00 PM",
    location: "Auditorium Hall",
    price: 45,
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    title: "Tech Conference",
    category: "Tech",
    date: "Jun 10, 2026",
    time: "9:00 AM",
    location: "Tech Park, New York",
    price: 99,
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80",
  },
];

// =========================
// Get Events API
// =========================
app.get("/api/events", (req, res) => {
  try {
    const {
      search = "",
      category = "",
      location = "",
      sort = "earliest",
    } = req.query;

    const searchText = search.toLowerCase();

    const filteredEvents = events
      .filter((event) => {
        const matchesSearch =
          event.title.toLowerCase().includes(searchText) ||
          event.category.toLowerCase().includes(searchText) ||
          event.location.toLowerCase().includes(searchText);

        const matchesCategory =
          !category || event.category === category;

        const matchesLocation =
          !location || event.location === location;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesLocation
        );
      })
      .sort((a, b) => {
        if (sort === "price-low") {
          return a.price - b.price;
        }

        if (sort === "price-high") {
          return b.price - a.price;
        }

        return new Date(a.date) - new Date(b.date);
      });

    res.status(200).json(filteredEvents);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch events",
      error: error.message,
    });
  }
});

// =========================
// Create Event API
// =========================
app.post("/api/events", async (req, res) => {
  try {
    const newEvent = new Event(req.body);

    const savedEvent = await newEvent.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create event",
      error: error.message,
    });
  }
});

// =========================
// Bookings Data
// =========================
const bookings = [
  {
    id: "BK-2026-001",
    title: "Music Concert 2026",
    date: "May 25, 2026",
    time: "7:00 PM",
    location: "Auditorium Hall, New York",
    status: "Confirmed",
    amount: 320,
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80",
  },
];

// =========================
// Get Bookings API
// =========================
app.get("/api/bookings", (req, res) => {
  try {
    const {
      status = "All Bookings",
      search = "",
    } = req.query;

    const searchText = search.toLowerCase();

    const filteredBookings = bookings.filter(
      (booking) => {
        const matchesStatus =
          status === "All Bookings" ||
          booking.status === status;

        const matchesSearch =
          booking.title
            .toLowerCase()
            .includes(searchText) ||
          booking.id
            .toLowerCase()
            .includes(searchText) ||
          booking.location
            .toLowerCase()
            .includes(searchText);

        return matchesStatus && matchesSearch;
      }
    );

    res.status(200).json(filteredBookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
});

// =========================
// Google Authentication API
// =========================
app.post("/api/auth/google", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token is required",
    });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
    );

    const profile = await response.json();

    if (!profile.email) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired access token",
      });
    }

    const userData = {
      email: profile.email,
      name: profile.name,
      avatar: profile.picture,
    };

    console.log(
      "Successfully Authenticated Google User:",
      userData
    );

    res.status(200).json({
      success: true,
      message: "User validated successfully",
      user: userData,
    });
  } catch (error) {
    console.error(
      "Internal verification error:",
      error.message
    );

    res.status(500).json({
      success: false,
      error: "Authentication pipeline failed",
    });
  }
});

// =========================
// Default Route
// =========================
app.get("/", (req, res) => {
  res.send("Event Management Backend Running...");
});

// =========================
// Server Start
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});