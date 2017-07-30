const { send, json } = require('micro')
const { router, post, get, put, del } = require('microrouter')
const UserManagerDB = require('user-manager-db')
const DbStub = require('./test/stub/db')

let db = new UserManagerDB()

if (process.env.NODE_ENV !== 'production') {
  db = new DbStub()
}

async function saveUser (req, res) {
  try {
    const user = await json(req)
    const created = await db.saveUser(user)
    send(res, 201, created)
  } catch (e) {
    send(res, 200, { err: e.message })
  }
}

async function getUsers (req, res) {
  try {
    const result = await db.getUsers()
    send(res, 200, result)
  } catch (e) {
    send(res, 200, { err: e.message })
  }
}

async function getUser (req, res) {
  try {
    const userId = req.params.id
    const result = await db.getUser(userId)
    send(res, 200, result)
  } catch (e) {
    send(res, 200, { err: e.message })
  }
}

async function updateUser (req, res) {
  try {
    const userId = req.params.id
    const data = await json(req)
    const result = await db.updateUser(userId, data)
    send(res, 200, result)
  } catch (e) {
    send(res, 200, { err: e.message })
  }
}

async function deleteUser (req, res) {
  try {
    const userId = req.params.id
    const result = await db.deleteUser(userId)
    send(res, 200, result)
  } catch (e) {
    send(res, 200, { err: e.message })
  }
}

async function saveGroup (req, res) {
  try {
    const group = await json(req)
    const created = await db.saveGroup(group)
    send(res, 201, created)
  } catch (e) {
    send(res, 200, { err: e.message })
  }
}

async function getGroups (req, res) {
  try {
    const result = await db.getGroups()
    send(res, 200, result)
  } catch (e) {
    send(res, 200, { err: e.message })
  }
}

async function getGroup (req, res) {
  try {
    const groupId = req.params.id
    const result = await db.getGroup(groupId)
    send(res, 200, result)
  } catch (e) {
    send(res, 200, { err: e.message })
  }
}

async function getUsersByGroup (req, res) {
  try {
    const groupId = req.params.id
    const result = await db.getUsersByGroup(groupId)
    send(res, 200, result)
  } catch (e) {
    send(res, 200, { err: e.message })
  }
}

async function updateGroup (req, res) {
  try {
    const groupId = req.params.id
    const data = await json(req)
    const result = await db.updateGroup(groupId, data)
    send(res, 200, result)
  } catch (e) {
    send(res, 200, { err: e.message })
  }
}

async function deleteGroup (req, res) {
  try {
    const groupId = req.params.id
    const result = await db.updateGroup(groupId)
    send(res, 200, result)
  } catch (e) {
    send(res, 200, { err: e.message })
  }
}

async function notFound (req, res) {
  send(res, 404, 'Not Found')
}

module.exports = router(
  post('/group/save', saveGroup),
  get('/group/list', getGroups),
  get('/group/:id', getGroup),
  get('/group/:id/users', getUsersByGroup),
  put('/group/:id', updateGroup),
  del('/group/:id', deleteGroup),
  post('/save', saveUser),
  get('/list', getUsers),
  get('/:id', getUser),
  put('/:id', updateUser),
  del('/:id', deleteUser),
  get('/*', notFound)
)
