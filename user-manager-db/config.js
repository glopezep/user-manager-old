module.exports = {
  dbName: process.env.DB_NAME || '[production_db_name]',
  dbUser: process.env.DB_USER || '[production_db_user]',
  dbPass: process.env.DB_PASS || '[production_db_pass]',
  dbPort: process.env.DB_PORT || '[production_db_port]',
  extra: {
    host: process.env.DB_HOST || '[production_db_host]',
    dialect: process.env.DB_DIALECT || '[production_db_dialect]',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
}
