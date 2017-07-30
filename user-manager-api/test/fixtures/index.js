function getGroup () {
  return {
    name: `Group 1`,
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
  return {
    name: `Jhon`,
    lastname: `Doe`,
    username: `jhon-doe`,
    password: '1234',
    email: `jhon-doe@pawadominicana.com`,
    avatar: `image.jpg`
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
