const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Extract token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify token
    const secret = process.env.JWT_SECRET || "your_jwt_secret";
    const decoded = jwt.verify(token, secret);

    // Attach user info to the request
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
};

module.exports = authenticateToken;
