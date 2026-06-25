const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/", adminController.getVenues);
router.post("/create", adminController.createVenue);

module.exports = router;