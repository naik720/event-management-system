const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
{
  name: String,
  type: String,
  location: String,
  capacity: Number,
  price: Number,
  description: String,
  facilities: [String],
  images: [String],
  status: {
    type: String,
    default: "Available"
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model("Venue", venueSchema);