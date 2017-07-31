const { send, json } = require('micro')
const { router, post } = require('microrouter')
const UserManagerDB = require('user-manager-db')
const DbStub = require('./test/stub/db')
const utils = require('./lib/utils')
const config = require('./config')

let db = new UserManagerDB()

if (process.env.NODE_ENV !== 'production') {
  db = new DbStub()
}

async function authenticate (req, res) {
  const credentials = await json(req)
  const auth = await db.authenticate(credentials.username, credentials.password)

  if (!auth) return send(res, 401, { err: 'invalid credentials' })

  const payload = { username: credentials.username }
  const token = await utils.signToken(payload, config.secret)
  send(res, 200, token)
}

module.exports = router(
  post('/', authenticate)
)
