const { db, Machine } = require('../../db/models')
const chai = require('chai')
const { expect } = require('chai')

chai.use(require('chai-as-promised'))
chai.use(require('chai-url'))

describe('Machine model', () => {
  before('Sync model', () => Machine.sync({ force: true }))

  beforeEach('Truncate data', () => Machine.truncate())

  describe('Schema', async () => {
    it('requires a "code" string', async () => {
      await expect(Machine.create()).to.be.rejected
      await expect(Machine.create('')).to.be.rejected
      await expect(Machine.create({ a: '1' })).to.be.rejected
    })

    it('requires a "name" string', async () => {
      await expect(Machine.create()).to.be.rejected
      await expect(Machine.create('')).to.be.rejected
      await expect(Machine.create({ a: '1' })).to.be.rejected
    })

    it('requires a "brand" string', async () => {
      await expect(Machine.create()).to.be.rejected
      await expect(Machine.create('')).to.be.rejected
      await expect(Machine.create({ a: '1' })).to.be.rejected
    })

    it('requires a "model" string', async () => {
      await expect(Machine.create()).to.be.rejected
      await expect(Machine.create('')).to.be.rejected
      await expect(Machine.create({ a: '1' })).to.be.rejected
    })
  })
})
