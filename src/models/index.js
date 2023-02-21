'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const { database } = require('../config');

function createModels(config) {
  const basename = path.basename(__filename);
  const db = {};

  const _config = {
    host: config.host,
    port: config.port,
    database: config.database,
    username: config.username,
    password: config.password,
    logging: config.logDatabase,
    logQueryParameters: config.logDatabaseParams,
    dialect: config.dialect,
    operatorsAliases: '0',
  };

  const sequelize = new Sequelize(_config);

  fs
    .readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      const model = require(path.join(__dirname, file));
      db[model.name] = model.init(sequelize, Sequelize);
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
}

const models = createModels(database);

module.exports = { models };
