const Booking = require("../models/Booking");
const Event = require("../models/Event");

// Book an Event
const bookEvent = async (req, res) => {
  const { eventId, guestName, guestEmail } = req.body;

  try {
    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Create a new booking
    const booking = new Booking({
      event: eventId,
      guestName,
      guestEmail,
    });

    await booking.save();

    res.status(201).json({ message: "Event booked successfully", booking });
  } catch (error) {
    res.status(500).json({ error: "Failed to book event" });
  }
};

// Get All Bookings for an Event
const getBookingsByEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const bookings = await Booking.find({ event: eventId }).populate("event");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

module.exports = { bookEvent, getBookingsByEvent };
