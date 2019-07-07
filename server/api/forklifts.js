const router = require('express').Router()
const { Forklift } = require('../db')
module.exports = router

// GET /api/montacargas
router.get('/', async (req,res,next) => {
  try {
    const rfm = await Forklift.findAll()
    res.json(rfm)
  } catch (error) { next(err) }
})

// GET /api/montacargas/:mqId
router.get(`/:mqId`, async (req, res, next) => {
  const { mqId } = req.params

  try {
    const rfm = await Forklift.findByPk(mqId)

    if(!rfm) {
      res.sendStatus(404)
    } else {
      res.json(rfm)
    }
  } catch (error) {
    next(error)
  }
})
