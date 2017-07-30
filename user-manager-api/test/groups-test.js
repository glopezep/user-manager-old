import test from 'ava'
import micro from 'micro'
import listen from 'test-listen'
import request from 'request-promise-native'
import users from '../users'
import fixtures from './fixtures'

test.beforeEach(async t => {
  const srv = micro(users)
  t.context.url = await listen(srv)
})

test('POST /save', async t => {
  const user = fixtures.getUser()
  const url = t.context.url
  const options = {
    method: 'POST',
    uri: `${url}/save`,
    json: true,
    body: user,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 201)
  t.deepEqual(response.body, user)
})

test('GET /list', async t => {
  const users = fixtures.getUsers()
  const url = t.context.url
  const options = {
    method: 'GET',
    uri: `${url}/list`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, users)
})

test('GET /:id', async t => {
  const user = fixtures.getUser()
  const url = t.context.url
  const options = {
    method: 'GET',
    uri: `${url}/1`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, user)
})

test('PUT /:id', async t => {
  const newUserData = fixtures.getUser()
  const url = t.context.url
  const options = {
    method: 'PUT',
    uri: `${url}/1`,
    json: true,
    body: newUserData,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, newUserData)
})

test('DELETE /:id', async t => {
  const user = fixtures.getUser()
  const url = t.context.url
  const options = {
    method: 'DELETE',
    uri: `${url}/1`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, user)
})

test('POST /group/save', async t => {
  const group = fixtures.getGroup()
  const url = t.context.url
  const options = {
    method: 'POST',
    uri: `${url}/group/save`,
    json: true,
    body: group,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 201)
  t.deepEqual(response.body, group)
})

test('GET /group/list', async t => {
  const groups = fixtures.getGroups()
  const url = t.context.url
  const options = {
    method: 'GET',
    uri: `${url}/group/list`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, groups)
})

test('GET /group/:id', async t => {
  const group = fixtures.getGroup()
  const url = t.context.url
  const options = {
    method: 'GET',
    uri: `${url}/group/1`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, group)
})

test('GET /group/:id/users', async t => {
  const users = fixtures.getUsers()
  const url = t.context.url
  const options = {
    method: 'GET',
    uri: `${url}/group/1/users`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, users)
})

test('PUT /group/:id', async t => {
  const newGroupData = fixtures.getGroup()
  const url = t.context.url
  const options = {
    method: 'PUT',
    uri: `${url}/group/1`,
    json: true,
    body: newGroupData,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, newGroupData)
})

test('DELETE /group/:id', async t => {
  const group = fixtures.getGroup()
  const url = t.context.url
  const options = {
    method: 'DELETE',
    uri: `${url}/group/1`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, group)
})
