import test from 'ava'
import UserManagerDB from '../'
import fixtures from './fixtures'
import utils from '../lib/utils'

const db = new UserManagerDB()

test.before('Setup database', async t => {
  t.is(typeof db.setup, 'function', 'setup should be a function')
  await db.setup()
})

test.after.always('Drop database', async t => {
  t.is(typeof db.drop, 'function', 'drop should be a function')
  await db.drop()
})

test('Save group', async t => {
  t.is(typeof db.saveGroup, 'function', 'Should be a function')

  const group = fixtures.getGroup()
  const created = await db.saveGroup(group)
  const result = created.get({ plain: true })

  t.is(group.name, result.name)
  t.is(group.description, result.description)
  await t.throws(db.saveGroup(null), /data not supplied/)
})

test('Get group', async t => {
  t.is(typeof db.getGroup, 'function', 'Should be a function')

  const group = fixtures.getGroup()
  const created = await db.saveGroup(group)
  const groupPlain = created.get({ plain: true })
  const found = await db.getGroup(groupPlain.id)
  const result = found.get({ plain: true })

  t.is(group.name, result.name)
  t.is(group.description, result.description)
  await t.throws(db.getGroup(null), /id not supplied/)
  await t.throws(db.getGroup('foo'), /not found/)
})

test('Get all groups', async t => {
  t.is(typeof db.getGroups, 'function', 'Should be a function')

  const group = fixtures.getGroup()
  await db.saveGroup(group)
  const result = await db.getGroups()

  t.truthy(result.length)
})

test('update group', async t => {
  t.is(typeof db.updateGroup, 'function', 'Should be a function')

  const group = fixtures.getGroup()
  const newGroupData = fixtures.getGroup()
  const created = await db.saveGroup(group)
  const createdPlain = created.get({ plain: true })
  const updated = await db.updateGroup(createdPlain.id, newGroupData)
  const updatedPlain = updated.get({ plain: true })
  t.notDeepEqual(createdPlain, updatedPlain)
  await t.throws(db.updateGroup(null, newGroupData), /id not supplied/)
  await t.throws(db.updateGroup('foo'), /not found/)
})

test('Delete group', async t => {
  t.is(typeof db.deleteGroup, 'function', 'Should be a function')

  const group = fixtures.getGroup()
  const created = await db.saveGroup(group)
  const groupPlain = created.get({ plain: true })
  const result = await db.deleteGroup(groupPlain.id)

  t.is(group.name, result.name)
  t.is(group.description, result.description)
  await t.throws(db.deleteGroup(null), /id not supplied/)
  await t.throws(db.deleteGroup('foo'), /not found/)
})

test('Save user', async t => {
  t.is(typeof db.saveUser, 'function', 'Should be a function')

  const user = fixtures.getUser()
  const plainPassword = user.password
  const created = await db.saveUser(user)
  const result = created.get({ plain: true })

  t.is(user.name, result.name)
  t.is(user.lastname, result.lastname)
  t.is(user.username, result.username)
  t.is(user.password, utils.encrypt(plainPassword))
  t.is(user.email, result.email)
  t.is(user.avatar, result.avatar)

  await t.throws(db.saveGroup(null), /data not supplied/)
})

test('Save user with group', async t => {
  t.is(typeof db.saveUser, 'function', 'Should be a function')

  const group = fixtures.getGroup()
  const createdGroup = await db.saveGroup(group)
  const groupPlain = createdGroup.get({ plain: true })

  const user = fixtures.getUser()
  const plainPassword = user.password

  user.groupId = groupPlain.id

  const created = await db.saveUser(user)
  const result = created.get({ plain: true })

  t.is(user.name, result.name)
  t.is(user.lastname, result.lastname)
  t.is(user.username, result.username)
  t.is(user.password, utils.encrypt(plainPassword))
  t.is(user.email, result.email)
  t.is(user.avatar, result.avatar)
  t.is(user.groupId, result.groupId)

  await t.throws(db.saveGroup(null), /data not supplied/)
})

test('Get user', async t => {
  t.is(typeof db.getUser, 'function', 'Should be a function')

  const user = fixtures.getUser()
  const plainPassword = user.password
  const created = await db.saveUser(user)
  const createdPlain = created.get({ plain: true })
  const found = await db.getUser(createdPlain.username)
  const result = found.get({ plain: true })

  t.is(user.name, result.name)
  t.is(user.lastname, result.lastname)
  t.is(user.username, result.username)
  t.is(user.password, utils.encrypt(plainPassword))
  t.is(user.email, result.email)
  t.is(user.avatar, result.avatar)

  await t.throws(db.getUser(null), /username not supplied/)
  await t.throws(db.getUser('foo'), /not found/)
})

test('Get all users', async t => {
  t.is(typeof db.getUsers, 'function', 'Should be a function')

  const user = fixtures.getUser()
  await db.saveGroup(user)
  const result = await db.getUsers()

  t.truthy(result.length)
})

test('Get all users by group', async t => {
  t.is(typeof db.getUsersByGroup, 'function', 'Should be a function')

  const group = fixtures.getGroup()
  const createdGroup = await db.saveGroup(group)
  const groupPlain = createdGroup.get({ plain: true })

  const user = fixtures.getUser()
  user.groupId = groupPlain.id
  await db.saveUser(user)
  const result = await db.getUsersByGroup(groupPlain.id)

  t.truthy(result.length)
  await t.throws(db.getUsersByGroup(null), /groupId not supplied/)
})

test('update user', async t => {
  t.is(typeof db.updateUser, 'function', 'Should be a function')

  const user = fixtures.getUser()
  const newUserData = fixtures.getUser()
  const created = await db.saveUser(user)
  const createdPlain = created.get({ plain: true })
  const updated = await db.updateUser(createdPlain.username, newUserData)
  const updatedPlain = updated.get({ plain: true })
  t.notDeepEqual(createdPlain, updatedPlain)
  await t.throws(db.updateUser(null, newUserData), /username not supplied/)
  await t.throws(db.updateUser('foo'), /not found/)
})

test('Delete user', async t => {
  t.is(typeof db.deleteUser, 'function', 'Should be a function')

  const user = fixtures.getUser()
  const created = await db.saveUser(user)
  const userPlain = created.get({ plain: true })
  const result = await db.deleteUser(userPlain.username)

  t.is(user.username, result.username)
  await t.throws(db.deleteUser(null), /username not supplied/)
  await t.throws(db.deleteUser('foo'), /not found/)
})
