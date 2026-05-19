const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});