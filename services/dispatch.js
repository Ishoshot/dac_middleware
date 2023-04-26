const AccountEnquiry = require('../api/AccountEnquiry')
const accountEnquiry = new AccountEnquiry()

module.exports = {
  dispatch: (data, req, res) => {
    data = JSON.parse(data);
    const { Intent } = data
    if (!Intent) {
      return res.status(500).json({ message: 'No Intent Found' });
    }
    switch (Intent) {
      case 'acct_bal':
        accountEnquiry.accountBalance(data, req, res)
        break
      default:
        return res.status(500).json({ message: 'No Activity Choosen' })
    }
  },
}
