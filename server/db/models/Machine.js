const Sequelize = require('sequelize')
const db = require('../db')

const Machine = db.define('machine', {
  code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
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

module.exports = Machine

