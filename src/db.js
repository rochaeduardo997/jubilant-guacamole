const Sequelize = require('sequelize');

const Books = require('./models/Books');

const { development: databaseConfig } = require('../config/config.json');

const sequelize = new Sequelize(databaseConfig);

Books.init(sequelize);

module.exports = sequelize;