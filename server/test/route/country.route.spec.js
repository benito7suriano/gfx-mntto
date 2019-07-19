const { expect } = require('chai')
const request = require('supertest')
const app = require('../../index')
const { Country } = require('../../db')

describe('Country routes', () => {
  before('Sync latest model on db', () => Country.sync({ force: true }))
  beforeEach('Truncate data on model', () => Country.truncate())

  describe('GET /api/paises', () => {
    it('responds with a 200 with all countries in db', async () => {
      const countries = [
        Country.create({ code: '1000', name: 'El Salvador' }),
        Country.create({ code: '2000', name: 'Honduras' }),
        Country.create({ code: '3000', name: 'Guatemala' })
      ]

      await Promise.all(countries)

      await request(app)
        .get('/api/paises')
        .expect(200)
        .then(response => {
          expect(response.body).to.have.lengthOf(countries.length)
        })
    })
  })

  describe('GET /api/paises/:paisId', () => {
    it('responds with a 200 with the correct country from db', async () => {
      const countries = await Country.create({ id: 1, code: '1000', name: 'El Salvador' })

      await request(app)
        .get(`/api/paises/1`)
        .expect(200)
        .then(res => {
          expect(res.body.name).to.equal(countries.name)
        })
    })
  })

  describe('POST /api/paises/', () => {
    it('responds with a 201 and creates the new country', async () => {
      const ecuCreate = {
        code: '6000',
        name: 'Ecuador'
      }

      await request(app)
        .post('/api/paises')
        .send(ecuCreate)
        .expect(201)

      const ecuador = Country.findOne({
        where: {
          code: ecuCreate.code
        }
      })

      expect(ecuador).to.exist
    })
  })
})
