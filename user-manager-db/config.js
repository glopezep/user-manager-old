module.exports = {
  dbName: process.env.DB_NAME || 'pawa_users',
  dbUser: process.env.DB_USER || 'root',
  dbPass: process.env.DB_PASS || '',
  dbPort: process.env.DB_PORT || '',
  extra: {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
}
