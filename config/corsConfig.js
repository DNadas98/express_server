const { logError } = require("../middleware/logger");

const allowedOrigins = [
  `http://${process.env.IP}:${process.env.PORT}`,
  `http://localhost:${process.env.PORT}`
];

const corsOptions = {
  methods: ["GET", "POST", "PATCH", "DELETE"],
  origin: (origin, callback) => {
    //!origin ONLY for development
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      const e = new Error("Not allowed by CORS");
      e.status = 403;
      logError(e);
      callback(e);
    }
  },
  optionsSuccessStatus: 204,
  credentials: true
};

module.exports = corsOptions;
