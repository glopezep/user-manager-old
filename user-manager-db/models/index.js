const Sequelize = require('Sequelize')
const sequelize = require('../lib/sequelize')

const Group = sequelize.define('group', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

// Group.hasMany(User)
// User.belongsTo(Group, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })

module.exports = {
  Group,
  User
}
