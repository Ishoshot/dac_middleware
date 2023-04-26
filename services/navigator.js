const Entrust = require('../api/Entrust')
const entrust = new Entrust()
const AccountEnquiry = require('../api/AccountEnquiry')
const accountEnquiry = new AccountEnquiry()

class Navigator {
  entrust(req, res) {
    console.log('Navigator -- Entrust')
    let type = req.body.request_type
    if (!type) {
      return res.status(500).json({ message: 'Invalid Entrust Operation' })
    } else {
      switch (type) {
        case 'block':
          entrust.block(req, res)
          break
        case 'unlock':
          entrust.unlock(req, res)
          break
        default:
          return res.status(500).json({ message: 'Invalid Entrust Operation' })
      }
    }
  }

  accountEnquiry(data, req, res) {
    console.log('Navigator -- Account Enquiry')
    let { Intent } = data;
    if (!Intent) {
      return res.status(500).json({ message: 'No Intent Found' });
    } else {
      switch (Intent) {
        case 'acct_bal':
          accountEnquiry.accountBalance(data, req, res)
          break
        default:
          return res.status(500).json({ message: 'Invalid Entrust Operation' })
      }
    }
  }
}

module.exports = Navigator
