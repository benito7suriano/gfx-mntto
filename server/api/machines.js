const router = require('express').Router()
const { Machine } = require('../db')
module.exports = router

// GET /api/machines
router.get('/', async (req,res,next) => {
  try {
    const rfm = await Machine.findAll()
    res.json(rfm)
  } catch (error) { next(error) }
})

// GET /api/machines/:mqId
router.get(`/:mqId`, async (req, res, next) => {
  const { mqId } = req.params

  try {
    const rfm = await Machine.findByPk(mqId)

    if(!rfm) {
      res.sendStatus(404)
    } else {
      res.json(rfm)
    }
  } catch (error) {
    next(error)
  }
})


