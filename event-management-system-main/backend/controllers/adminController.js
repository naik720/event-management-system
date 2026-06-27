const fs = require("fs");
const path = require("path");
const Venue = require("../models/Venue");

// Get all venues
exports.getVenues = async (req, res) => {
  try {
    const venues = await Venue.find();

    res.status(200).json({
      success: true,
      venues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update venue
exports.updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Venue updated successfully",
      venue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete venue
exports.deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);

    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Venue deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadVenueImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: "Image payload is required" });
    }

    const matches = image.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ success: false, message: "Invalid image format" });
    }

    const extension = matches[1].split("/")[1];
    const buffer = Buffer.from(matches[2], "base64");
    const fileName = `venue-${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`;
    const uploadPath = path.join(__dirname, "..", "uploads", fileName);

    await fs.promises.writeFile(uploadPath, buffer);
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;

    res.status(201).json({ success: true, imageUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create venue
exports.createVenue = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const venue = new Venue(req.body);

    await venue.save();

    res.status(201).json({
      success: true,
      message: "Venue created successfully",
      venue,
    });
  } catch (error) {
    console.error("Venue Save Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};