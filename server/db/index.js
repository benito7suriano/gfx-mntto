const db = require('./db')
const {
  Country,
  Center,
  RollformerRoof,
  RollformerGHT,
  Forklift
} = require('./models')

// associations go here
Center.belongsTo(Country)
Country.hasMany(Center)

RollformerRoof.belongsTo(Center)
Center.hasOne(RollformerRoof)

RollformerGHT.belongsTo(Center)
Center.hasOne(RollformerGHT)

Forklift.belongsTo(Center)
Center.hasOne(Forklift)

module.exports = {
  db,
  Country,
  Center,
  RollformerRoof,
  RollformerGHT,
  Forklift
}
