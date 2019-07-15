const { db, Country } = require('../db/models')
const chai = require('chai')
const { expect } = require('chai')

chai.use(require('chai-as-promised'))
chai.use(require('chai-url'))

describe('Country model', () => {
  before('Sync model', () => Country.sync({ force: true }))

  beforeEach('Truncate data', () => Country.truncate())

  describe('Schema', async () => {
    it('requires a "code" string', async () => {
      await expect(Country.create()).to.be.rejected
      await expect(Country.create('')).to.be.rejected
      await expect(Country.create({a: '1'})).to.be.rejected
    })

    it('requires a "name" string', async () => {
      await expect(Country.create()).to.be.rejected
      await expect(Country.create('')).to.be.rejected
      await expect(Country.create({ a: '1' })).to.be.rejected
    })
  })
})
