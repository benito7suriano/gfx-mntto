const Sequelize = require('sequelize')
const db = require('../db')

const RollformerGHT = db.define('ght-rollformer', {
  code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  model: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contract: {
    type: Sequelize.STRING
  }
})

module.exports = RollformerGHT
