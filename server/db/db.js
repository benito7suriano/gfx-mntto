const chalk = require('chalk')
const Sequelize = require('sequelize')
const pkg = require('../../package.json')

console.log(chalk.yellow('Opening db connection...'))

module.exports = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${pkg.name}`, { logging: false })
