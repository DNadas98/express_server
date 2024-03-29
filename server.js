const path = require("path");
const fs = require("fs");
const express = require("express");
const helmet = require("helmet");
const helmetConfig = require("./config/helmetConfig");
const rateLimiter = require("./middleware/rateLimiter");
const banHandler = require("./middleware/banHandler");
const cors = require("cors");
const corsConfig = require("./config/corsConfig");
const {logRequest, logServed, logError} = require("./middleware/logger");
const mongoose = require("mongoose");
const dbConnection = require("./model/dbConnection");

//DotENV
const envPath = path.join(__dirname, "config/config.env");
if (!fs.existsSync(envPath)) {
  throw new Error(".env file not found in the config directory");
}
require("dotenv").config({path: envPath});

const server = express();

//CORS
server.use(cors(corsConfig));

//Security
server.disable("x-powered-by");
server.use(helmet(helmetConfig));
server.use(rateLimiter);
server.use(banHandler);

//Request parsing
server.use(express.urlencoded({extended: true}));
server.use(express.json());

//static
//server.use("/static", express.static(path.join(__dirname, "/view/static")));

//Request logger middleware
server.use((req, res, next) => {
  logRequest(req);
  next();
});

//Routing

server.use("/test-error", (req, res, next) => {
  throw new Error("Test error");
});

//404 - Not Found
server.use((req, res, next) => {
  try {
    res.status(404);
    logServed(req, res, next);
    if (req.accepts("application/json")) {
      return res.json({message: "Not Found"});
    }
    return res.send("Not Found");
  } catch (e) {
    logError(e, req, next);
    return next(e);
  }
});

//500 - Internal Server Error
// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
  try {
    res.status(500);
    logError(err, req, next);
    if (req.accepts("application/json")) {
      return res.json({message: "Internal Server Error"});
    }
    return res.send("Internal Server Error");
  } catch (e) {
    logError(e, req, next);
    return res.end();
  }
});

//Connect to database, start server
async function start() {
  try {
    await dbConnection();
    console.log("Connected to database");
    server.listen(process.env.PORT, () => {
      console.log(`HTTP Server running on port ${process.env.PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
}

start();

//handle DB errors
mongoose.connection.on("error", (err) => {
  logError(err);
});
