const express = require("express");
const { bookEvent, getBookingsByEvent } = require("../controllers/bookingControllers");
const router = express.Router();

// User books an event
router.post("/book", bookEvent);

// Get all bookings for a specific event
router.get("/:eventId/bookings", getBookingsByEvent);

module.exports = router;
