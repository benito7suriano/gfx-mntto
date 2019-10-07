const {
  db,
  Country,
  Center,
  Machine
} = require('../server/db')
const {green, red, yellow} = require('chalk')

const seed = async () => {
  await db.sync({ force: true })

  // Countries

  const gua = await Country.create({
    code: '3000',
    name: 'Guatemala'
  })

  const hon = await Country.create({
    code: '2000',
    name: 'Honduras'
  })

  const esa = await Country.create({
    code: '1000',
    name: 'El Salvador'
  })

  // Centers
  // Associations
  // Center.belongsTo(Country)
  // Country.hasMany(Center)

  const atp = await Center.create({
    code: '1001',
    name: 'Autopista Sur',
    zone: 'Capital 1',
    email: 'atp.gerencia@galvanissa.com',
    countryId: esa.id
  })

  const dop = await Center.create({
    code: '1002',
    name: 'Desvío de Opico',
    zone: 'La Libertad',
    email: 'atp.gerencia@galvanissa.com',
    countryId: esa.id
  })

  const tgu = await Center.create({
    code: '2001',
    name: 'Tegucigalpa',
    zone: 'Tegucigalpa',
    email: 'tgu.gerencia@grupoferromax.com',
    countryId: hon.id
  })

  const agb = await Center.create({
    code: '3001',
    name: 'Aguilar Batres',
    zone: 'Zone 1',
    email: 'agb@grupoferromax.com',
    countryId: gua.id
  })

  const brb = await Center.create({
    code: '3002',
    name: 'Barberena',
    zone: 'Zone 1',
    email: 'agb@grupoferromax.com',
    countryId: gua.id
  })

  const ces = await Center.create({
    code: '3003',
    name: 'Carretera a El Salvador',
    zone: 'Zone 1',
    email: 'agb@grupoferromax.com',
    countryId: gua.id
  })

  const centers = [atp, dop, tgu, agb, brb, ces]

  // Roof roll-former

  /**
   * Associations --->
   * Machine.belongsTo(Center)
   * Center.hasMany(Machine)
   */

  await Machine.create({
    code: '31200001',
    name: 'Roladora de Techos E25',
    type: 'Roof Rollformer',
    brand: 'Reliantt',
    model: 'RFM Single-Layer E25',
    contract: '1',
    centerId: atp.id
  })

  await Machine.create({
    code: '31200002',
    name: 'Roladora de Techos E25',
    type: 'Roof Rollformer',
    brand: 'Reliantt',
    model: 'RFM Single-Layer E25',
    contract: '2',
    centerId: dop.id
  })

  await Machine.create({
    code: '31200003',
    name: 'Roladora de Techos E25/Ond',
    type: 'Roof Rollformer',
    brand: 'Reliantt',
    model: 'RFM Double-Layer E25/Ond',
    contract: '3',
    centerId: tgu.id
  })

  await Machine.create({
    code: '31200004',
    name: 'Roladora de Techos E25/Ond',
    type: 'Roof Rollformer',
    brand: 'Reliantt',
    model: 'RFM Double-Layer E25/Ond',
    contract: '4',
    centerId: agb.id
  })

  await Machine.create({
    code: '31200005',
    name: 'Roladora de Techos E25/Ond',
    type: 'Roof Rollformer',
    brand: 'Reliantt',
    model: 'RFM Double-Layer E25/Ond',
    contract: '5',
    centerId: brb.id
  })

  await Machine.create({
    code: '31200006',
    name: 'Roladora de Techos E25/Ond',
    type: 'Roof Rollformer',
    brand: 'Reliantt',
    model: 'RFM Double-Layer E25/Ond',
    contract: '6',
    centerId: ces.id
  })

  await Machine.create({
    code: '31200007',
    name: 'Roladora de Polín-GHT 4"x2" + 3"x2"',
    type: 'GHT Rollformer',
    brand: 'Haisi',
    model: '3" and 4" C-Channel RFM',
    contract: '7',
    centerId: agb.id
  })

  await Machine.create({
    code: '31200008',
    name: 'Roladora de Polín-GHT 4"x2" + 3"x2"',
    type: 'GHT Rollformer',
    brand: 'Haisi',
    model: '3" and 4" C-Channel RFM',
    contract: '8',
    centerId: ces.id
  })
  await Machine.create({
    code: '31200009',
    name: 'Roladora de Polín-GHT 4"x2" + 3"x2"',
    type: 'GHT Rollformer',
    brand: 'Haisi',
    model: '3" and 4" C-Channel RFM',
    contract: '9',
    centerId: brb.id
  })

  const forklifts = []

  centers.forEach((center,idx) => {
    const mq = '3120001' + `${idx}`
    const contract = '1' + `${idx}`

    const promise = Machine.create({
      code: mq,
      name: 'Montacargas de 6-ton para CDS',
      type: 'Forklift',
      brand: 'Hangcha',
      model: 'CPCD60-RW14',
      contract,
      centerId: center.id
    })

    forklifts.push(promise)
  })

  await Promise.all(forklifts)

  db.close()
  console.log(green(`

    Seeding successful!
    Let's go!!!!

  `))
}

seed()
  .catch(err => {
    db.close()

    console.log(red(`

    Error Seeding:

    ${err.message}
    ${err.stack}

    `))
  })
