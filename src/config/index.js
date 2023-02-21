require('dotenv').config();

const db = require('./db');
const config = require('./config')

module.exports = { database: db[process.env.NODE_ENV || 'development'], config };
