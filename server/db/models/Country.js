const Sequelize = require('sequelize')
const db = require('../db')

const Country = db.define('country', {
  code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }

})

module.exports = Country
