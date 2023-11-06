const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");

function logRequest(req) {
  try {
    const message = `${req.method}\t${req.originalUrl}\t${req.ip}`;
    console.log(getLogItem(message));
  } catch (e) {
    console.error(e);
  }
}

function logServed(req, res) {
  try {
    const message = `${req.method}\t${req.url}\t${res.statusCode}`;
    console.log(getLogItem(message));
  } catch (e) {
    console.error(e);
  }
}

function logError(err, req) {
  try {
    const reqString = req ? `\t${req.method}\t${req.originalUrl}\t${req.ip}` : "";
    const message = `${reqString}\nError: ${err}`;
    console.error(getLogItem(message));
  } catch (e) {
    console.error(e);
  }
}

function getLogItem(message) {
  const dateTime = `${format(new Date(), "yyyyMMdd HH:mm:ss")}`;
  return `${uuidv4()}\t${dateTime}\t${message}\n`;
}

module.exports = { logRequest, logServed, logError };
