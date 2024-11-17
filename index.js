const express = require('express');
const app = express();
const cors=require("cors");
require('dotenv').config()
const userRoutes = require("./routes/userRoute");
const eventRoutes = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const authenticateToken = require("./middleware/authMiddleware");

const connectDatabase = require("./config/database");
connectDatabase();

const port = process.env.PORT || 7000;
app.use(cors())
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/events", authenticateToken,eventRoutes);
app.use("/api/bookings", authenticateToken,bookingRoutes);

app.get('/', (req, res) => {
    res.send('Hello, Vercel!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
