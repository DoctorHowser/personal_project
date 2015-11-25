var Sequelize = require('sequelize'),
    sequelize = new Sequelize('postgres://localhost:5432/PrimeOrigin');

module.exports = sequelize;