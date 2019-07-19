const { db, RollformerGHT } = require('../../db/models')
const chai = require('chai')
const { expect } = require('chai')

chai.use(require('chai-as-promised'))
chai.use(require('chai-url'))

describe('RollformerGHT model', () => {
  before('Sync model', () => RollformerGHT.sync({ force: true }))

  beforeEach('Truncate data', () => RollformerGHT.truncate())

  describe('Schema', async () => {
    it('requires a "code" string', async () => {
      await expect(RollformerGHT.create()).to.be.rejected
      await expect(RollformerGHT.create('')).to.be.rejected
      await expect(RollformerGHT.create({ a: '1' })).to.be.rejected
    })

    it('requires a "name" string', async () => {
      await expect(RollformerGHT.create()).to.be.rejected
      await expect(RollformerGHT.create('')).to.be.rejected
      await expect(RollformerGHT.create({ a: '1' })).to.be.rejected
    })

    it('requires a "brand" string', async () => {
      await expect(RollformerGHT.create()).to.be.rejected
      await expect(RollformerGHT.create('')).to.be.rejected
      await expect(RollformerGHT.create({ a: '1' })).to.be.rejected
    })

    it('requires a "model" string', async () => {
      await expect(RollformerGHT.create()).to.be.rejected
      await expect(RollformerGHT.create('')).to.be.rejected
      await expect(RollformerGHT.create({ a: '1' })).to.be.rejected
    })
  })
})
