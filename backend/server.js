const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const { OAuth2Client } = require('google-auth-library');

const app = express();

app.use(cors());
app.use(express.json());

// =========================
//    MongoDB Atlas Connection
// =========================
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => console.log("MongoDB Atlas cloud connection established successfully!"))
  .catch(err => console.error(" MongoDB connection error:", err));

// Create a Mongoose Schema for your Events
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  image: String
});

const Event = mongoose.model('Event', eventSchema);

// Initialize Google OAuth2 Client with generated ID
const client = new OAuth2Client("685762159805-5hrhspefo76lum330n5lk4eiuqhnq78p.apps.googleusercontent.com");

/* =========================
   Background Images API
========================= */
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

/* =========================
   Events API (Reading from Database!)
========================= */
app.get("/api/events", async (req, res) => {
  try {
    const allEvents = await Event.find(); // 
    res.json(allEvents);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch events from database" });
  }
});

HEAD
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
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=700&q=80",
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
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    title: "Design Workshop",
    category: "Workshop",
    date: "Jun 18, 2026",
    time: "2:00 PM",
    location: "Creative Hub",
    price: 35,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    title: "Food Festival 2026",
    category: "Food & Drink",
    date: "Jun 05, 2026",
    time: "11:00 AM",
    location: "Central Park",
    price: 0,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    title: "Art Exhibition",
    category: "Art & Culture",
    date: "Jun 12, 2026",
    time: "10:00 AM",
    location: "Art Gallery",
    price: 15,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 6,
    title: "Sports Event Live",
    category: "Sports",
    date: "Jun 20, 2026",
    time: "6:00 PM",
    location: "Stadium Arena",
    price: 60,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 7,
    title: "Standup Comedy Night",
    category: "Comedy",
    date: "May 30, 2026",
    time: "8:00 PM",
    location: "City Theatre",
    price: 25,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 8,
    title: "Online Marketing Webinar",
    category: "Business",
    date: "Jun 15, 2026",
    time: "3:00 PM",
    location: "Online Event",
    price: 0,
    status: "Online",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=700&q=80",
  },
];

app.get("/api/events", (req, res) => {
  const { search = "", category = "", location = "", sort = "earliest" } = req.query;
  const searchText = search.toLowerCase();

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchText) ||
        event.category.toLowerCase().includes(searchText) ||
        event.location.toLowerCase().includes(searchText);
      const matchesCategory = !category || event.category === category;
      const matchesLocation = !location || event.location === location;

      return matchesSearch && matchesCategory && matchesLocation;
    })
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      return new Date(a.date) - new Date(b.date);
    });

  res.json(filteredEvents);
});

/* =========================
   Bookings API
========================= */

const bookings = [
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

app.get("/api/bookings", (req, res) => {
  const { status = "All Bookings", search = "" } = req.query;
  const searchText = search.toLowerCase();

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = status === "All Bookings" || booking.status === status;
    const matchesSearch =
      booking.title.toLowerCase().includes(searchText) ||
      booking.id.toLowerCase().includes(searchText) ||
      booking.location.toLowerCase().includes(searchText);

    return matchesStatus && matchesSearch;
  });

  res.json(filteredBookings);

// Extra endpoint to seed or create an event manually from your frontend/Postman
app.post("/api/events", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* =========================
   Google Authentication API
========================= */
app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: "Token is required" });
  }

  try {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
    const profile = await response.json();

    if (!profile.email) {
      return res.status(400).json({ success: false, message: "Invalid or expired access token" });
    }

    const userData = {
      email: profile.email,
      name: profile.name,
      avatar: profile.picture
    };

    console.log("Successfully Authenticated Google User:", userData);

    res.status(200).json({
      success: true,
      message: "User validated successfully",
      user: userData
    });

  } catch (error) {
    console.error("Internal verification error:", error);
    res.status(500).json({ success: false, error: "Authentication pipeline failed" });
  }
ad032d66962f4ca0a93a00ddc18786e074d9a46b
});

/* =========================
   Server Start
========================= */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});