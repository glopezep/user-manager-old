const fixtures = require('../fixtures')

class DbStub {
  saveGroup () {
    return Promise.resolve(fixtures.getGroup())
  }

  getGroups () {
    return Promise.resolve(fixtures.getGroups())
  }

  getGroup (id) {
    return Promise.resolve(fixtures.getGroup())
  }

  getUsersByGroup (id) {
    return Promise.resolve(fixtures.getUsers())
  }

  updateGroup (id, data) {
    return Promise.resolve(fixtures.getGroup())
  }

  deleteGroup (id) {
    return Promise.resolve(fixtures.getGroup())
  }

  saveUser () {
    return Promise.resolve(fixtures.getUser())
  }

  getUsers () {
    return Promise.resolve(fixtures.getUsers())
  }

  getUser (id) {
    return Promise.resolve(fixtures.getUser())
  }

  updateUser (id, data) {
    return Promise.resolve(fixtures.getUser())
  }

  deleteUser (id) {
    return Promise.resolve(fixtures.getUser())
  }
}

module.exports = DbStub
