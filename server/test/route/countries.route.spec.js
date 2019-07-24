const { expect } = require('chai')
const request = require('supertest')
const app = require('../../index')
const { Country } = require('../../db/models')

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

  describe('GET /api/paises/:countryId', () => {

    it('responds with a 200 with the correct country from db', async () => {

      const countries = await Country.create({ id: 1, code: '1000', name: 'El Salvador' })

      await request(app)
        .get(`/api/paises/1`)
        .expect(200)
        .then(res => {
          expect(res.body.name).to.equal(countries.name)
        })
    })

    it('responds with a 404 if the specified country is not found', async () => {
      const countries = await Country.create({ id: 1, code: '1000', name: 'El Salvador' })

      await request(app)
        .get(`/api/paises/12`)
        .expect(404)
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

  describe('PUT /api/paises/:countryId', () => {
    it('responds with a 204 and updates the correct country', async () => {
      const paises = [
        Country.create({id: 7, code: '7000', name: 'Peru'}),
        Country.create({id: 8, code: '8000', name: 'Chili'})
      ]

      await Promise.all(paises)

      await request(app)
      .put('/api/paises/8')
      .send({ name: 'Chile' })
      .set('Accept', 'application/json')
      .expect(204)

       const correctedChile = await Country.findOne({
         where: {
           id: 8
         }
       })

       expect(correctedChile.name).to.equal('Chile')
    })
  })

  describe('DELETE /api/paises/:countryId', () => {
    it('deletes a country and responds with a 204', async () => {
      const countries = [
        Country.create({id: 1, code: '1000', name: 'ESA'}),
        Country.create({id: 2, code: '2000', name: 'HON'}),
        Country.create({id: 3, code: '3000', name: 'GUA'})
      ]

      await Promise.all(countries)

      await request(app)
        .delete('/api/paises/2')
        .expect(204)
    })
  })
})
