const { db, RollformerRoof } = require('../../db/models')
const chai = require('chai')
const { expect } = require('chai')

chai.use(require('chai-as-promised'))
chai.use(require('chai-url'))

describe('RollformerRoof model', () => {
  before('Sync model', () => RollformerRoof.sync({ force: true }))

  beforeEach('Truncate data', () => RollformerRoof.truncate())

  describe('Schema', async () => {
    it('requires a "code" string', async () => {
      await expect(RollformerRoof.create()).to.be.rejected
      await expect(RollformerRoof.create('')).to.be.rejected
      await expect(RollformerRoof.create({ a: '1' })).to.be.rejected
    })

    it('requires a "name" string', async () => {
      await expect(RollformerRoof.create()).to.be.rejected
      await expect(RollformerRoof.create('')).to.be.rejected
      await expect(RollformerRoof.create({ a: '1' })).to.be.rejected
    })

    it('requires a "brand" string', async () => {
      await expect(RollformerRoof.create()).to.be.rejected
      await expect(RollformerRoof.create('')).to.be.rejected
      await expect(RollformerRoof.create({ a: '1' })).to.be.rejected
    })

    it('requires a "model" string', async () => {
      await expect(RollformerRoof.create()).to.be.rejected
      await expect(RollformerRoof.create('')).to.be.rejected
      await expect(RollformerRoof.create({ a: '1' })).to.be.rejected
    })
  })
})
