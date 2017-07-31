import test from 'ava'
import nock from 'nock'
import userManager from '../'
import fixtures from './fixtures'

const options = {
  endpoints: {
    users: 'http://api.pawadominicana.test/users',
    auth: 'http://api.pawadominicana.test/auth'
  }
}

test.beforeEach(t => {
  const client = userManager.createClient(options)
  t.context.client = client
})

test('Client', t => {
  const client = t.context.client

  t.is(typeof client.saveGroup, 'function', 'Should be a function')
  t.is(typeof client.getGroups, 'function', 'Should be a function')
  t.is(typeof client.getGroup, 'function', 'Should be a function')
  t.is(typeof client.updateGroup, 'function', 'Should be a function')
  t.is(typeof client.deleteGroup, 'function', 'Should be a function')
  t.is(typeof client.saveUser, 'function', 'Should be a function')
  t.is(typeof client.getUsers, 'function', 'Should be a function')
  t.is(typeof client.getUsersByGroup, 'function', 'Should be a function')
  t.is(typeof client.getUser, 'function', 'Should be a function')
  t.is(typeof client.updateUser, 'function', 'Should be a function')
  t.is(typeof client.deleteUser, 'function', 'Should be a function')
  t.is(typeof client.authenticate, 'function', 'Should be a function')
})

test('Save Group', async t => {
  const group = fixtures.getGroup()
  const client = t.context.client

  nock(options.endpoints.users)
    .post('/group/save', group)
    .reply(201, group)

  const response = await client.saveGroup(group)

  t.is(response.statusCode, 201)
  t.deepEqual(response.body, group)
})

test('Get Groups', async t => {
  const groups = fixtures.getGroups()
  const client = t.context.client

  nock(options.endpoints.users)
    .get('/group/list')
    .reply(200, groups)

  const response = await client.getGroups(groups)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, groups)
})

test('Get Group', async t => {
  const group = fixtures.getGroup()
  const client = t.context.client

  nock(options.endpoints.users)
    .get('/group/1')
    .reply(200, group)

  const response = await client.getGroup(1)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, group)
})

test('Update Group', async t => {
  const newGroupData = fixtures.getGroup()
  const client = t.context.client

  nock(options.endpoints.users)
    .put('/group/1', newGroupData)
    .reply(200, newGroupData)

  const response = await client.updateGroup(1, newGroupData)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, newGroupData)
})

test('Delete Group', async t => {
  const group = fixtures.getGroup()
  const client = t.context.client

  nock(options.endpoints.users)
    .delete('/group/1')
    .reply(200, group)

  const response = await client.deleteGroup(1)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, group)
})

test('Save user', async t => {
  const user = fixtures.getUser()
  const client = t.context.client

  nock(options.endpoints.users)
    .post('/save', user)
    .reply(201, user)

  const response = await client.saveUser(user)

  t.is(response.statusCode, 201)
  t.deepEqual(response.body, user)
})

test('Get user', async t => {
  const users = fixtures.getUsers()
  const client = t.context.client

  nock(options.endpoints.users)
    .get('/list')
    .reply(200, users)

  const response = await client.getUsers()

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, users)
})

test('Get user by group', async t => {
  const users = fixtures.getUsers()
  const client = t.context.client

  nock(options.endpoints.users)
    .get('/group/1/users')
    .reply(200, users)

  const response = await client.getUsersByGroup(1)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, users)
})

test('Get user', async t => {
  const user = fixtures.getUser()
  const client = t.context.client

  nock(options.endpoints.users)
    .get('/1')
    .reply(200, user)

  const response = await client.getUser(1)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, user)
})

test('Update user', async t => {
  const newUserData = fixtures.getUser()
  const client = t.context.client

  nock(options.endpoints.users)
    .put('/1', newUserData)
    .reply(200, newUserData)

  const response = await client.updateUser(1, newUserData)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, newUserData)
})

test('Delete user', async t => {
  const user = fixtures.getUser()
  const client = t.context.client

  nock(options.endpoints.users)
    .delete('/1')
    .reply(200, user)

  const response = await client.deleteUser(1)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, user)
})

test('Authenticate', async t => {
  const user = fixtures.getUser()
  const client = t.context.client
  const token = 'xxxx-xxxx-xxxx'
  const credentials = {
    username: user.username,
    password: user.password
  }

  nock(options.endpoints.auth)
    .post('/', credentials)
    .reply(200, token)

  const response = await client.authenticate(user.username, user.password)

  t.deepEqual(response.body, token)
})
