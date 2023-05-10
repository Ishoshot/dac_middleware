const { log } = require('../utils/log')
const uuidv4 = require('uuid')
const { saveInMemory, getFromMemory, deleteFromMemory } = require('../utils/redis')

class AccountEnquiry {
  async accountBalance(data, req, res) {
    const uniqueID = uuidv4.v4()
    const { AccountNumber } = data;
    if (!AccountNumber || AccountNumber == "") {
      //save request in memory
      await saveInMemory(uniqueID, req.body.prompt)
      return res.status(200).json({
        code: '09',
        promptId: uniqueID,
        message: 'Sorry! I believe you are trying to get the balance of an account. Kindly rephrase your request and ensure an account number is provided.',
        otherMessage: ''
      });
    }
    // const valid = validator.accountBalance(data, req, res)
    // if (!valid) {
    //   return;
    // }
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
    //if the is a promptId in the request body, delete it from memory
    if (req.body.promptId) {
      await deleteFromMemory(req.body.promptId)
    }

    return res.status(200).json(response)
  }
}

module.exports = AccountEnquiry
