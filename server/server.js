const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "config/config.env") });
const express = require("express");
const helmet = require("helmet");
const helmetConfig = require("./config/helmetConfig");
const rateLimiter = require("./middleware/rateLimiter");
const banHandler = require("./middleware/banHandler");
const cors = require("cors");
const corsConfig = require("./config/corsConfig");
const { logRequest, logServed, logError } = require("./middleware/logger");

const server = express();

//Security middleware
server.use(cors(corsConfig));
server.use(helmet(helmetConfig));
server.use(rateLimiter);
server.use(banHandler);

//Built-in middleware to handle form data, JSON and static files
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use("/static", express.static(path.join(__dirname, "../client/static")));

//Request logger middleware
server.use(logRequest);

//Routing

//serve build
server.get(/^\/$|^\/index(\.html)?$/, (req, res, next) => {
  try {
    res.status(200);
    logServed(req, res);
    return res.sendFile(path.join(__dirname, "../client/pages/index.html"));
  } catch (err) {
    return next(err);
  }
});

//test server error route
// eslint-disable-next-line no-unused-vars
server.get("/test-error", (req, res, next) => {
  next(new Error("test error"));
});

//404 - Not Found
server.use((req, res, next) => {
  try {
    if (req.accepts("text/html")) {
      res.status(404);
      logServed(req, res);
      return res.sendFile(path.join(__dirname, "../client/pages/404.html"));
    } else if (req.accepts("application/json")) {
      res.status(404);
      logServed(req, res);
      return res.json({ message: "Not Found" });
    } else {
      res.status(404);
      logServed(req, res);
      return res.send("Not Found");
    }
  } catch (err) {
    logError(err, req);
    return next(err);
  }
});

//500 - Internal Server Error
// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
  try {
    if (req.accepts("text/html")) {
      res.status(500);
      logServed(req, res);
      return res.sendFile(path.join(__dirname, "../client/pages/500.html"));
    } else if (req.accepts("application/json")) {
      res.status(500);
      logServed(req, res);
      return res.json({ message: "Internal Server Error" });
    } else {
      res.status(500);
      logServed(req, res);
      return res.send("Internal Server Error");
    }
  } catch (error) {
    logError(error, req);
    return res.end();
  }
});

//Start server
async function start() {
  try {
    server.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

start();
