const express = require("express");
const { createEvent, getEvents } = require("../controllers/eventControllers");
const router = express.Router();

// Admin creates an event
router.post("/create", createEvent);

// Get all events
router.get("/", getEvents);

module.exports = router;
