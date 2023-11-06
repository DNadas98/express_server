const bannedOrigins = require("../config/bannedOrigins");

function banHandler(req, res, next) {
  const origin = req.headers.origin;
  if (bannedOrigins.includes(origin)) {
    return res.status(403).send("Forbidden");
  }
  return next();
}

module.exports = banHandler;
