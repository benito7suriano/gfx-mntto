const { expect } = require('chai')
const request = require('supertest')
const app = require('../../index')
const { Machine } = require('../../db/models')

describe('Machines routes', () => {
  before('Sync latest model on db', async () => {
    await Machine.sync({ force: true })
  })

  beforeEach('Clean up data on model', async () => {
    await Machine.truncate()
  })

  describe('GET /api/machines', () => {
    it('GETs all the machines in the db', async () => {
      const machines = [
        Machine.create({
          code: '3100001',
          name: 'machine_1',
          type: 'type_1',
          brand: 'brand',
          model: 'model1'
        }),
        Machine.create({
          code: '3100002',
          name: 'machine_2',
          type: 'type_2',
          brand: 'brand',
          model: 'model2'
        }),
        Machine.create({
          code: '3100003',
          name: 'machine_3',
          type: 'type_3',
          brand: 'brand',
          model: 'model3'
        }),
        Machine.create({
          code: '3100004',
          name: 'machine_4',
          type: 'type_4',
          brand: 'brand',
          model: 'model4'
        }),
      ]

      await Promise.all(machines)

      await request(app)
        .get(`/api/machines`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.lengthOf(machines.length)
        })
    })
  })

  describe('GET /api/machines/:mqId', () => {
    it('responds with a 200 and the selected machine', async () => {
      const machines = [
        Machine.create({
          id: 1,
          code: '3100001',
          name: 'machine_1',
          type: 'type_1',
          brand: 'brand',
          model: 'model1'
        }),
        Machine.create({
          id: 2,
          code: '3100002',
          name: 'machine_2',
          type: 'type_2',
          brand: 'brand',
          model: 'model2'
        }),
        Machine.create({
          id: 3,
          code: '3100003',
          name: 'machine_3',
          type: 'type_3',
          brand: 'brand',
          model: 'model3'
        }),
        Machine.create({
          id: 4,
          code: '3100004',
          name: 'machine_4',
          type: 'type_4',
          brand: 'brand',
          model: 'model4'
        })
      ]

      await Promise.all(machines)

      await request(app)
        .get(`/api/machines/1`)
        .expect(200)
        .then(res => {
          expect(res.body.name).to.equal('machine_1')
        })
    })
  })

  describe('POST /api/machines', () => {
    it('creates a new machine on db.', async () => {
      const newMachine = {
        code: '3400004',
        name: 'machine_4',
        type: 'type_4',
        brand: 'brand',
        model: 'model4'
      }

      await request(app)
        .post(`/api/machines`)
        .send(newMachine)
        .expect(201)

      const created = Machine.findOne({
        where: {
          code: '3400004'
        }
      })

      expect(created).to.exist
    })
  })

  describe('PUT /api/machines/:mqId', () => {
    it('updates an already existent machine on db', async () => {
      const machines = [
        Machine.create({
          id: 1,
          code: '1',
          name: 'machine_1',
          brand: 'brandA',
          model: 'modelT',
          type: 'machinery'
        }),
        Machine.create({
          id: 2,
          code: '2',
          name: 'machine_2',
          brand: 'brandA',
          model: 'modelT',
          type: 'machinery'
        })
      ]

      await request(app)
        .put(`/api/machines/2`)
        .send({model: 'modelX'})
        .expect(204)

      const updated = await Machine.findByPk(2)

      expect(updated.model).to.equal('modelX')
    })
  })

  describe('DELETE /api/machines/:mqId', () => {
    it('deletes specified machine from db', async () => {
      const machine = {
        id: 1,
        code: '1',
        name: 'machine_1',
        brand: 'brandA',
        model: 'modelX',
        type: 'machinery'
      }

      await Machine.create(machine)

      await request(app)
        .delete(`/api/machines/1`)
        .expect(204)

    })
  })
})
