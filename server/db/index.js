const db = require('./db')
const {
  Country,
  Center,
  Machine
} = require('./models')

// associations go here
Center.belongsTo(Country)
Country.hasMany(Center)

Machine.belongsTo(Center)
Center.hasOne(Machine)

module.exports = {
  db,
  Country,
  Center,
  Machine
}
