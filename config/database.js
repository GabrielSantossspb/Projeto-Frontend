const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Garante que estamos exportando a instância "sequelize" com "s" minúsculo
module.exports = sequelize; 