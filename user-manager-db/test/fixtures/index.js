const uuid = require('uuid/v4')

function getGroup () {
  const id = uuid()
  return {
    name: `Group ${id}`,
    description: 'This is a example group description'
  }
}

function getGroups () {
  return [
    getGroup(),
    getGroup(),
    getGroup()
  ]
}

function getUser () {
  const id = uuid()
  return {
    name: `Jhon ${id}`,
    lastname: `Doe, ${id}`,
    username: `jhon-doe-${id}`,
    password: '1234',
    email: `jhon-doe-${id}@pawadominicana.com`,
    avatar: `${id}.jpg`
  }
}

function getUsers () {
  return [
    getUser(),
    getUser(),
    getUser()
  ]
}

module.exports = {
  getGroup,
  getGroups,
  getUser,
  getUsers
}
