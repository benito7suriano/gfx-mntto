const router = require('express').Router()
const { RollformerGHT } = require('../db')
module.exports = router

// GET /api/polin-maquinas
router.get('/', async (req,res,next) => {
  try {
    const rfm = await RollformerGHT.findAll()
    res.json(rfm)
  } catch (error) { next(err) }
})

// GET /api/polin-maquinas/:mqId
router.get(`/:mqId`, async (req, res, next) => {
  const { mqId } = req.params

  try {
    const rfm = await RollformerGHT.findByPk(mqId)

    if(!rfm) {
      res.sendStatus(404)
    } else {
      res.json(rfm)
    }
  } catch (error) {
    next(error)
  }
})
