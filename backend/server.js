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
});

/* =========================
   Server Start
========================= */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});