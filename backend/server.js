const express = require("express");
const cors = require("cors");
const { OAuth2Client } = require('google-auth-library');

const app = express();

app.use(cors());
app.use(express.json());

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
   Events API
========================= */

const events = [
  {
    id: 1,
    title: "Rock Music Festival",
    location: "Jaipur",
    price: 499,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
  },
  {
    id: 2,
    title: "DJ Night",
    location: "Delhi",
    price: 699,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
  },
  {
    id: 3,
    title: "Tech Expo",
    location: "Mumbai",
    price: 999,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
  },
  {
    id: 4,
    title: "Food Festival",
    location: "Bangalore",
    price: 299,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  },
  {
    id: 5,
    title: "Startup Meetup",
    location: "Hyderabad",
    price: 799,
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754",
  },
  {
    id: 6,
    title: "Dance Concert",
    location: "Pune",
    price: 599,
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
  },
];

app.get("/api/events", (req, res) => {
  res.json(events);
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
    // Fetch profile details directly via Google Identity endpoints using the client token
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
    const profile = await response.json();

    if (!profile.email) {
      return res.status(400).json({ success: false, message: "Invalid or expired access token" });
    }

    // Consolidated payload returned to front-end context
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