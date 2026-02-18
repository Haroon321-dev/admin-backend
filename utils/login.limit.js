import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many login attempts. Please try again after 15 minutes.",
    });
  },
  skip: (req) => req.user?.isAdmin,
});


// Final Architecture (Cookie Based)

// Flow:

// User clicks Google login

// Google returns ID token

// Frontend sends token to backend

// Backend verifies token

// Backend generates YOUR JWT

// JWT sent in httpOnly cookie

// Browser automatically cookie store karega

// No localStorage ❌
// No token handling on frontend ❌
// More secure ✅