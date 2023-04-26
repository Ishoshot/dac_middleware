const { log } = require('../utils/log')
const Validator = require('../utils/Validator')
const validator = new Validator()
const uuidv4 = require('uuid')

class AccountEnquiry {
  accountBalance(data, req, res) {
    const uniqueID = uuidv4.v4()
    const { AccountNumber } = data;
    const valid = validator.accountBalance(data, req, res)
    if (!valid) {
      return;
    }
    // Call log on Request
    log('Incoming', uniqueID, data)
    // Call Bank's API
    const response = {
      code: '00',
      message:
        `Dear ${AccountNumber}, Your Available Balance is 345,656.00 NGN, Book Balance: 762,792.00 NGN`,
      otherMessage: '',
    }
    log('Outgoing', uniqueID, data)
    return res.status(200).json(response)
  }
}

module.exports = AccountEnquiry
