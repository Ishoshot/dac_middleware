class Validator {
  entrust(req, res) {
    var id = req.body.serial_number
    if (!id) {
      res.status(500).json({ message: 'Please Provide Your Serial Number' })
      return false
    } else {
      return true
    }
  }

  accountBalance(data, req, res) {
    const { AccountNumber } = data
    if (!AccountNumber) {
      res.status(200).json({
        code: '09',
        message: 'Sorry! I believe you are trying to get the balance of an account. Kindly rephrase your request and ensure an account number is provided.',
        otherMessage: ''
      });
      return false
    }
  }

  AccountNumber(data, req, res) {
    const { AccountNumber } = data
    if (!AccountNumber) {
      return false
    }
    return true
  }
}

module.exports = Validator
