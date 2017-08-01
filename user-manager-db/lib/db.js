const Promise = require('bluebird')
const utils = require('./utils')
const models = require('./sequelize')
const defaults = require('../config')

class UserManagerDB {
  constructor (options) {
    this.options = options || defaults
    this.models = models(this.options)
  }
  async saveGroup (group, callback) {
    try {
      if (!group) return Promise.reject(new Error('data not supplied'))
      const created = await this.models.Group.create(group)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(new Error(e)).asCallback(callback)
    }
  }

  async getGroup (id, callback) {
    try {
      if (!id) return Promise.reject(new Error('id not supplied'))
      const group = await this.models.Group.findOne({
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
      const groups = await this.models.Group.findAll({
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
      const created = await this.models.User.create(user)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(new Error(e)).asCallback(callback)
    }
  }

  async getUser (username, callback) {
    try {
      if (!username) return Promise.reject(new Error('username not supplied'))
      const user = await this.models.User.findOne({
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
      const users = await this.models.User.findAll({
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
      const users = await this.models.User.findAll({
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

  async authenticate (username, password) {
    try {
      const user = await this.getUser(username)
      if (user.password !== utils.encrypt(password)) {
        return Promise.resolve(false)
      }
      return Promise.resolve(true)
    } catch (e) {
      return Promise.resolve(false)
    }
  }

  async setup (callback) {
    try {
      // await this.models.Group.sync()
      await this.models.sequelize.sync()
      return Promise.resolve('Setup completed').asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async drop (callback) {
    try {
      // await this.models.User.drop()
      await this.models.sequelize.drop()
      return Promise.resolve('Drop completed').asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }
}

module.exports = UserManagerDB
