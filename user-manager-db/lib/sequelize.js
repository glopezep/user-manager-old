const Sequelize = require('sequelize')
const config = require('../config')

let sequelize
let { dbName, dbUser, dbPass, dbPort, extra } = config

if (process.env.NODE_ENV !== 'production') {
  dbName = 'pawa_users_test'
}

sequelize = new Sequelize(dbName, dbUser, dbPass, extra)

if (process.env.DB_DIALECT === 'postgres') {
  const url = `postgres://${dbUser}:${dbPass}@${extra.host}:${dbPort}/${dbName}`
  sequelize = new Sequelize(url)
}

module.exports = sequelize
