require('dotenv').config();

console.log(`Configured for ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    seederStorage: 'sequelize',
    dialect: 'mysql',
    logDatabase: console.log,
    logDatabaseParams: true,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    port: '3306',
    seederStorage: 'sequelize',
    dialect: 'mysql',
    logDatabase: console.log,
    logDatabaseParams: true,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    seederStorage: 'sequelize',
    dialect: 'mysql',
    logDatabase: false,
    logDatabaseParams: true,
  },
};
