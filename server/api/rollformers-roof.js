const router = require('express').Router()
const { RollformerRoof } = require('../db')
module.exports = router

// GET /api/techos-maquinas
router.get('/', async (req,res,next) => {
  try {
    const rfm = await RollformerRoof.findAll()
    res.json(rfm)
  } catch (error) { next(err) }
})

// GET /api/techos-maquinas/:mqId
router.get(`/:mqId`, async (req, res, next) => {
  const { mqId } = req.params

  try {
    const rfm = await RollformerRoof.findByPk(mqId)

    if(!rfm) {
      res.sendStatus(404)
    } else {
      res.json(rfm)
    }
  } catch (error) {
    next(error)
  }
})
