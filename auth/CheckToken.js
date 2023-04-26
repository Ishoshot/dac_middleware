const dotenv = require('dotenv')
dotenv.config()
const { log } = require('../utils/log')
const _token = process.env.TOKEN
const uuidv4 = require('uuid')

module.exports = {
  checkToken: (req, res) => {
    //uuidv4
    const uniqueID = uuidv4.v4();
    const token = req.token
    // log("Incoming", uniqueID, req.body);
    if (!token) {
      let data = {
        code: '90',
        message: 'No Bearer Token provided.',
      };
      log("Outgoing", uniqueID, data);
      return res.status(401).json(data)
    }
    if (token !== _token) {
      return { status: false, uniqueID }
    } else {
      return { status: true, uniqueID }
    }
  },


  validateToken: (req, res) => {
    const token = req.body.token
    const uniqueID = uuidv4.v4();
    log("Incoming", uniqueID, req.body);
    if (!token) {
      let data = {
        code: '90',
        message: 'No token provided.',
      }
      log("Outgoing", uniqueID, data);
      return res.status(401).json(data)
    }
    if (req.body.token === '1122334455') {
      let data = {
        code: '00',
        message: 'Verification Successful',
        otherMessage: 'Valid Token Code',
      };
      log("Outgoing", uniqueID, data);
      return res.status(200).json(data)
    } else {
      let data = {
        code: '01',
        message: 'Verification Failed',
        otherMessage: 'Invalid Token Code',
      }
      log("Outgoing", uniqueID, data);
      return res.status(200).json(data)
    }
  },
}
