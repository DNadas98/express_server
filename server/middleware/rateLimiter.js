const rateLimit = require("express-rate-limit");
const { logError } = require("./logger");

const rateLimiter = rateLimit({
  windowMs: process.env.LIMITER_MS,
  max: process.env.LIMITER_MAX,
  message: { "message": "Too many requests from this origin" },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    logError(options, req);
    return res.status(403).json(options.message);
  }
});

module.exports = rateLimiter;
