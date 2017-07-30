const UserManagerDB = require('./')

const db = new UserManagerDB()

db.setup(function (err, msg) {
  if (err) {
    console.log(err)
    process.exit()
  }

  console.log(msg)
  process.exit()
})
