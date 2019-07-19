const { db, Forklift } = require('../../db/models')
const chai = require('chai')
const { expect } = require('chai')

chai.use(require('chai-as-promised'))
chai.use(require('chai-url'))

describe('Forklift model', () => {
  before('Sync model', () => Forklift.sync({ force: true }))

  beforeEach('Truncate data', () => Forklift.truncate())

  describe('Schema', async () => {
    it('requires a "code" string', async () => {
      await expect(Forklift.create()).to.be.rejected
      await expect(Forklift.create('')).to.be.rejected
      await expect(Forklift.create({ a: '1' })).to.be.rejected
    })

    it('requires a "name" string', async () => {
      await expect(Forklift.create()).to.be.rejected
      await expect(Forklift.create('')).to.be.rejected
      await expect(Forklift.create({ a: '1' })).to.be.rejected
    })

    it('requires a "brand" string', async () => {
      await expect(Forklift.create()).to.be.rejected
      await expect(Forklift.create('')).to.be.rejected
      await expect(Forklift.create({ a: '1' })).to.be.rejected
    })

    it('requires a "model" string', async () => {
      await expect(Forklift.create()).to.be.rejected
      await expect(Forklift.create('')).to.be.rejected
      await expect(Forklift.create({ a: '1' })).to.be.rejected
    })
  })
})
