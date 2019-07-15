const { db, Center } = require('../db/models')
const chai = require('chai')
const { expect } = require('chai')

chai.use(require('chai-as-promised'))
chai.use(require('chai-url'))

describe('Center model', () => {
  before('Sync model', () => Center.sync({ force: true }))

  beforeEach('Truncate data', () => Center.truncate())

  describe('Schema', async () => {
    it('requires a "code" string', async () => {
      await expect(Center.create()).to.be.rejected
      await expect(Center.create('')).to.be.rejected
      await expect(Center.create({ a: '1' })).to.be.rejected
    })

    it('requires a "name" string', async () => {
      await expect(Center.create()).to.be.rejected
      await expect(Center.create('')).to.be.rejected
      await expect(Center.create({ a: '1' })).to.be.rejected
    })

    it('requires a "zone" string', async () => {
      await expect(Center.create()).to.be.rejected
      await expect(Center.create('')).to.be.rejected
      await expect(Center.create({ a: '1' })).to.be.rejected
    })

    it('requires an email with the correct email format', async () => {
      await expect(Center.create({code: '1234', name: 'xyz', zone:'center', email: 2345})).to.be.rejected
      await expect(Center.create({code: '1234', name: 'xyz', zone:'center', email: {key: 'im an obj'}})).to.be.rejected
      await expect(Center.create({code: '1234', name: 'xyz', zone:'center', email: 'this is not an email'})).to.be.rejected
    })

    it('image defaults to `*.jpg` if no image is supplied', async () => {
      const newCenter = await Center.create({ code: '1234', name: 'xyz', zone: 'center', email: 'foo@bar.com' })

      expect(newCenter.imageUrl).to.be.equal('*.jpg')
    })
  })
})
