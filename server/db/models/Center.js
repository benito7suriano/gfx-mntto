const Sequelize = require('sequelize')
const db = require('../db')

const Center = db.define('center', {
  code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING
  },
  tel: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '*.jpg'
  }
})

module.exports = Center
