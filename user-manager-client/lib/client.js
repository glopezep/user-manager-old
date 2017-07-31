const Promise = require('bluebird')
const request = require('request-promise-native')
const defaults = require('../config')

class Client {
  constructor (options) {
    this.options = options || defaults
  }

  saveGroup (group, callback) {
    const options = {
      method: 'POST',
      uri: `${this.options.endpoints.users}/group/save`,
      json: true,
      body: group,
      resolveWithFullResponse: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  getGroups (callback) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/group/list`,
      json: true,
      resolveWithFullResponse: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  getGroup (id, callback) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/group/${id}`,
      json: true,
      resolveWithFullResponse: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  updateGroup (id, data, callback) {
    const options = {
      method: 'PUT',
      uri: `${this.options.endpoints.users}/group/${id}`,
      json: true,
      body: data,
      resolveWithFullResponse: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  deleteGroup (id, callback) {
    const options = {
      method: 'DELETE',
      uri: `${this.options.endpoints.users}/group/${id}`,
      json: true,
      resolveWithFullResponse: true
    }
    return Promise.resolve(request(options)).asCallback(callback)
  }

  saveUser (user, callback) {
    const options = {
      method: 'POST',
      uri: `${this.options.endpoints.users}/save`,
      json: true,
      body: user,
      resolveWithFullResponse: true
    }
    return Promise.resolve(request(options)).asCallback(callback)
  }

  getUsers (callback) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/list`,
      json: true,
      resolveWithFullResponse: true
    }
    return Promise.resolve(request(options)).asCallback(callback)
  }

  getUsersByGroup (id, callback) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/group/${id}/users`,
      json: true,
      resolveWithFullResponse: true
    }
    return Promise.resolve(request(options)).asCallback(callback)
  }

  getUser (id, callback) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/${id}`,
      json: true,
      resolveWithFullResponse: true
    }
    return Promise.resolve(request(options)).asCallback(callback)
  }

  updateUser (id, data, callback) {
    const options = {
      method: 'PUT',
      uri: `${this.options.endpoints.users}/${id}`,
      json: true,
      body: data,
      resolveWithFullResponse: true
    }
    return Promise.resolve(request(options)).asCallback(callback)
  }

  deleteUser (id, callback) {
    const options = {
      method: 'DELETE',
      uri: `${this.options.endpoints.users}/${id}`,
      json: true,
      resolveWithFullResponse: true
    }
    return Promise.resolve(request(options)).asCallback(callback)
  }

  authenticate (username, password, callback) {
    const options = {
      method: 'POST',
      uri: `${this.options.endpoints.auth}`,
      json: true,
      body: { username, password },
      resolveWithFullResponse: true
    }
    return Promise.resolve(request(options)).asCallback(callback)
  }
}

module.exports = Client
