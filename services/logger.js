const Connection = require('../utils/Connection')
const connection = new Connection()
const fs = require('fs')
const { getDate, getFileDate, isWeekend, getDateAndTime } = require('./date')
const dotenv = require('dotenv')
dotenv.config()

class Logger {
  logToDB(level, message) {
    const con = connection.create()
    if (typeof message !== 'string') {
      message = JSON.stringify(message)
    }
    //create table if it doesn't exist
    con.query(
      `CREATE TABLE IF NOT EXISTS ${process.env.MYSQL_DB} (id INT AUTO_INCREMENT PRIMARY KEY, level VARCHAR(255), message VARCHAR(255), date TIMESTAMP)`,
      function (err, result) {
        if (err) throw err
      },
    )
    var sql = `INSERT INTO ${process.env.MYSQL_DB} (level, message, date) VALUES ('${level}', '${message}', now())`
    con.query(sql, function (err, result) {
      if (err) throw err
    })
    connection.close(con)
  }

  // Log To file
  logToFile(data) {
    if (typeof data !== 'string') {
      data.date = getDateAndTime()
      data = JSON.stringify(data)
    }

    //create a directory called logs if it doesn't exist
    if (!fs.existsSync('logs')) {
      fs.mkdirSync('logs')
    }

    //Log to file
    fs.appendFile(
      'logs/dac-log-' + getFileDate() + '.log',
      '\n' + data,
      function (err) {
        if (err) throw err
      },
    )

    // Script to determine weekend inorder to achieve logs
    isWeekend()
  }
}

module.exports = Logger
