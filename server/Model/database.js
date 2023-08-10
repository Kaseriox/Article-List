const Sequelize = require('sequelize')
const SQLite = require('sqlite3')

const sequelize = new Sequelize('database', 'admin', 'admin', {
  dialect: 'sqlite',
  storage: './server/db/database.sqlite',
  dialectOptions: {
    mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
  },
});
module.exports = sequelize
