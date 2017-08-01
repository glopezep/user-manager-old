
module.exports = (config) => {
  const Sequelize = require('sequelize')

  let sequelize
  let { dbName, dbUser, dbPass, dbPort, extra } = config
  var db = {}

  if (process.env.NODE_ENV !== 'production') {
    dbName = 'pawa_users_test'
  }

  sequelize = new Sequelize(dbName, dbUser, dbPass, extra)

  if (process.env.DB_DIALECT === 'postgres') {
    const url = `postgres://${dbUser}:${dbPass}@${extra.host}:${dbPort}/${dbName}`
    sequelize = new Sequelize(url)
  }

  // Assing models
  var User = sequelize.import(`${__dirname}/../models/user`)
  var Group = sequelize.import(`${__dirname}/../models/group`)

  db.User = User
  db.Group = Group

  // Associate model relations
  Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

  db.sequelize = sequelize
  db.Sequelize = Sequelize

  return db
}
