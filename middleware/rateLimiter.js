const rateLimit = require("express-rate-limit");
const { logError } = require("./logger");

const rateLimiter = rateLimit({
  windowMs: process.env.LIMITER_MS,
  max: process.env.LIMITER_MAX,
  message: { "message": "Too many requests from this origin" },
  standardHeaders: true,
  legacyHeaders: false,
  // eslint-disable-next-line no-unused-vars
  handler: (req, res, next, options) => {
    logError(options, req);
    return res.status(403).json(options.message);
  },
  // eslint-disable-next-line no-unused-vars
  skip: (req) => {
    return req.path.startsWith("/static");
  }
});

module.exports = rateLimiter;
