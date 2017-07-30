const Promise = require('bluebird')
const models = require('../models')
const utils = require('./utils')

class UserManagerDB {
  async saveGroup (group, callback) {
    try {
      if (!group) return Promise.reject(new Error('data not supplied'))
      const created = await models.Group.create(group)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(new Error(e)).asCallback(callback)
    }
  }

  async getGroup (id, callback) {
    try {
      if (!id) return Promise.reject(new Error('id not supplied'))
      const group = await models.Group.findOne({
        where: { id },
        include: [ { all: true, nested: true } ]
      })
      if (!group) return Promise.reject(new Error('not found'))
      return Promise.resolve(group).asCallback(callback)
    } catch (e) {
      return Promise.reject(new Error(e)).asCallback(callback)
    }
  }

  async getGroups (callback) {
    try {
      const groups = await models.Group.findAll({
        include: [ { all: true, nested: true } ]
      })
      return Promise.resolve(groups).asCallback(callback)
    } catch (e) {
      return Promise.reject(new Error(e)).asCallback(callback)
    }
  }

  async updateGroup (id, data, callback) {
    try {
      if (!id) return Promise.reject(new Error('id not supplied'))
      const group = await this.getGroup(id)
      group.update(data, { fields: ['name', 'description'] })
      return Promise.resolve(group).asCallback(callback)
    } catch (e) {
      return Promise.reject(new Error(e)).asCallback(callback)
    }
  }

  async deleteGroup (id, callback) {
    try {
      if (!id) return Promise.reject(new Error('id not supplied'))
      const group = await this.getGroup(id)
      const deleted = JSON.parse(JSON.stringify(group))
      await group.destroy()
      return Promise.resolve(deleted).asCallback(callback)
    } catch (e) {
      return Promise.reject(new Error(e)).asCallback(callback)
    }
  }

  async saveUser (user, callback) {
    try {
      if (!user) return Promise.reject(new Error('data not supplied'))
      user.password = utils.encrypt(user.password)
      const created = await models.User.create(user)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(new Error(e)).asCallback(callback)
    }
  }

  async getUser (username, callback) {
    try {
      if (!username) return Promise.reject(new Error('username not supplied'))
      const user = await models.User.findOne({
        where: { username },
        include: [ { all: true, nested: true } ]
      })
      if (!user) return Promise.reject(new Error('not found'))
      return Promise.resolve(user).asCallback(callback)
    } catch (e) {
      return Promise.reject(new Error(e)).asCallback(callback)
    }
  }

  async getUsers (callback) {
    try {
      const users = await models.User.findAll({
        include: [ { all: true, nested: true } ]
      })
      return Promise.resolve(users).asCallback(callback)
    } catch (e) {
      return Promise.reject(new Error(e)).asCallback(callback)
    }
  }

  async getUsersByGroup (groupId, callback) {
    try {
      if (!groupId) return Promise.reject(new Error('groupId not supplied'))
      const users = await models.User.findAll({
        where: { groupId },
        include: [ { all: true, nested: true } ]
      })
      return Promise.resolve(users).asCallback(callback)
    } catch (e) {
      return Promise.reject(new Error(e)).asCallback(callback)
    }
  }

  async updateUser (username, data, callback) {
    try {
      if (!username) return Promise.reject(new Error('username not supplied'))
      const user = await this.getUser(username)
      user.update(data, {
        fields: ['name', 'lastname', 'username', 'password', 'email', 'avatar']
      })
      return Promise.resolve(user).asCallback(callback)
    } catch (e) {
      return Promise.reject(new Error(e)).asCallback(callback)
    }
  }

  async deleteUser (username, callback) {
    try {
      if (!username) return Promise.reject(new Error('username not supplied'))
      const user = await this.getUser(username)
      const deleted = JSON.parse(JSON.stringify(user))
      await user.destroy()
      return Promise.resolve(deleted).asCallback(callback)
    } catch (e) {
      return Promise.reject(new Error(e)).asCallback(callback)
    }
  }

  async setup (callback) {
    try {
      await models.Group.sync()
      await models.User.sync()
      return Promise.resolve('Setup completed').asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async drop (callback) {
    try {
      await models.User.drop()
      await models.Group.drop()
      return Promise.resolve('Drop completed').asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }
}

module.exports = UserManagerDB
