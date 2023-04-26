const express = require('express')
const app = express()
const dotenv = require('dotenv')
const axios = require('axios')
const bearerToken = require('express-bearer-token')
const { checkToken, validateToken } = require('./auth/CheckToken')
const { dispatch } = require('./services/dispatch')
const Connection = require('./utils/Connection')
const connection = new Connection()
const router = express.Router()
const { log } = require('./utils/log')
const uuid = require('uuid')


dotenv.config()
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(
  bearerToken({
    bodyKey: 'access_token',
    queryKey: 'access_token',
    headerKey: 'Bearer',
    reqKey: 'token',
    cookie: false, // by default is disabled
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router);


// General Middleware
router.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path)
  if (req.path == '/validate/token') {
    return next()
  }
  let { status, uniqueID } = checkToken(req, res)
  if (!status) {
    let data = { code: 90, message: 'Unauthorized' };
    log("Outgoing", uniqueID, data);
    return res.status(403).json(data)
  }
  return next()
})


/* --------------------------- Application Routes --------------------------- */
router.post('/validate/token', (req, res) => {
  return validateToken(req, res)
})


router.post('/middleware', (req, res) => {

  // Check for Prompt
  if (req.body.prompt == null) {
    return res.status(422).json({ code: '90', message: 'No Prompt' })
  }

  // Get Intent
  axios.post('http://127.0.0.1:5000/api/openai/intent-recognizer', {
    prompt: req.body.prompt,
  }, {
    headers: {
      'Authorization': `Bearer ${req.token}`
    }
  }).then((response) => {
    console.log(response.data)
    return dispatch(response.data.data, req, res)
  }).catch((error) => {
    return res.status(500).json(error)
  })
})

// Display logs from DB to view
app.get('/', function (req, res) {
  con = connection.create()
  var sql = 'Select * from logs'
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      throw err
    }
    res.render('./pages/logs', { result })
  })
  con.end()
})



//PORT
const port = process.env.PORT
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
