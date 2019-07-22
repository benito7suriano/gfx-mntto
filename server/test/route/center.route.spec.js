const { expect } = require('chai')
const request = require('supertest')
const app = require('../../index')
const { Center, Machine } = require('../../db/models')

describe('Center routes', () => {
  before('Sync latest model on db', async () => {
    await Center.sync({ force: true })
  })

  describe('GET /api/centros', () => {
    before('Truncate latest model on db', async () => {
      await Center.truncate()
    })

    it('responds with a 200 with all centers in db', async () => {
      const centers = [
        Center.create({
          id: 1,
          code: '1001',
          name: 'ABC',
          zone: 'Central'
         }),
        Center.create({
          id: 2,
          code: '1002',
          name: 'DEF',
          zone: 'West'
         }),
        Center.create({
          id: 3,
          code: '1003',
          name: 'XYZ',
          zone: 'East'
         })
      ]

      await Promise.all(centers)

      await request(app)
        .get('/api/centros')
        .expect(200)
        .then(response => {
          expect(response.body).to.have.lengthOf(centers.length)
        })
    })
  })

  describe('GET /api/centros/:centerId', () => {
    before('Truncate latest model on db', async () => {
      await Center.truncate()
    })

    it('responds with a 200 with the correct center from db', async () => {
      const center = await Center.create({
        id: 1,
        code: '1001',
        name: 'ABC',
        zone: 'Central'
      })

      await request(app)
        .get(`/api/centros/1`)
        .expect(200)
        .then(res => {
          expect(res.body.name).to.equal(center.name)
        })
    })

    it('responds with a 404 if the specified center is not found', async () => {
      const center = await Center.create({
        id: 2,
        code: '1002',
        name: 'DEF',
        zone: 'Central'
      })

      await request(app)
        .get(`/api/centros/12`)
        .expect(404)
    })
  })

  describe('GET /api/centros/:centerId/machines', () => {
    before('Truncate latest model on db', async () => {
      await Center.truncate()
    })

    beforeEach('Sync latest rfm model and truncate', async () => {
      await Machine.sync({ force: true })
      await Machine.truncate()
    })

    it('returns all the info of the correct RFM on db', async () => {
      const center = await Center.create({
        id: 1,
        code: '1001',
        name: 'ABC',
        zone: 'Center',
      })

      const rfm = await Machine.create({
        code: '111111',
        type: 'roll former',
        name: 'Roof Example Former',
        brand: 'Brand',
        model: 'Model T'
      })

      const forklift = await Machine.create({
        code: '222222',
        type: 'forklift',
        name: 'Forklift example',
        brand: 'Brand',
        model: 'Model T'
      })

      await rfm.setCenter(center)
      await forklift.setCenter(center)

      await request(app)
        .get('/api/centros/1/machines')
        .expect(200)
        .then(res => {
          const machines = res.body

          expect(machines.length).to.equal(2)
          expect(machines[0].code).to.equal('111111')
          expect(machines[0].center.name).to.equal('ABC')
          expect(machines[1].code).to.equal('222222')
          expect(machines[1].center.name).to.equal('ABC')
        })
    })

    it('returns a 404 if the specified center is not found', async () => {
      const center = await Center.create({
        id: 2,
        code: '1002',
        name: 'DEF',
        zone: 'Center',
      })

      const rfm = await Machine.create({
        code: '111111',
        type: 'roll former',
        name: 'Roof Example Former',
        brand: 'Brand',
        model: 'Model T'
      })

      rfm.setCenter(center)

      await request(app)
        .get(`/api/centros/12000/machines`)
        .expect(404)
    })
  })


})
