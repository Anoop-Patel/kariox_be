const Event = require("../models/Event");

// Create an Event (Admin Only)
const createEvent = async (req, res) => {
  const { title, venue, date, time, price } = req.body;

  try {
    // Create a new event
    const event = new Event({
      title,
      venue,
      date,
      time,
      price,
      createdBy: req.user.id, // Assuming req.user contains the logged-in admin's info
    });

    await event.save();

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
};

// Get All Events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

module.exports = { createEvent, getEvents };
