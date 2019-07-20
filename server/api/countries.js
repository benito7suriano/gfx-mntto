const router = require('express').Router()
const { Country } = require('../db')
module.exports = router

// GET /api/paises
router.get('/', async (req,res,next) => {
  try {
    const paises = await Country.findAll()
    res.json(paises)
  } catch (error) { next(err) }
})

// GET /api/paises/:paisId
router.get(`/:paisId`, async (req, res, next) => {
  const { paisId } = req.params

  try {
    const pais = await Country.findByPk(paisId)

    if(!pais) {
      res.sendStatus(404)
    } else {
      res.json(pais)
    }
  } catch (error) {
    next(error)
  }
})

// POST /api/paises/
router.post('/', async(req, res, next) => {
  const newCountry = req.body

  console.log(req.body)

  try {
    const country = await Country.create(newCountry)

    res.status(201).json(country)

  } catch (error) {
    next(error)
  }
})

// PUT /api/paises/:countryId
router.put('/:countryId', async(req, res, next) => {
  const { countryId } = req.params

  try {
    const country = await Country.findOne({
      where: {
        id: +countryId
      }
    })

    await country.update(req.body)
    res.send(204).end()

  } catch (error) {
    next(error)
  }
})

// DELETE /api/paises/:countryId
router.delete('/:countryId', async(req, res, next) => {
  const { countryId } = req.params

  try {

    await Country.destroy({
      where: {
        id: countryId
      }
    })

    res.send(204).end()

  } catch (error) {
    next(error)
  }
})
