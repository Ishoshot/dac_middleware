const Logger = require('../services/logger')
const logger = new Logger()

module.exports = {
  log: (type, uniqueID, data) => {
    // Request to be Logged
    let request;
    if (type == "Incoming") {
      request = { id: uniqueID, type, request: data }
    } else {
      request = { id: uniqueID, type, response: data }
    }

    // Logging
    logger.logToDB('info', request)
    logger.logToFile(request)
  },
}
