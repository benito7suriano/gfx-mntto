const router = require('express').Router()
const { Center, Machine } = require('../db')
module.exports = router

// GET /api/centros
router.get('/', async (req,res,next) => {
  try {
    const centers = await Center.findAll()
    res.json(centers)
  } catch (error) { next(err) }
})

// GET /api/centers/:centerId/machines
router.get(`/:centerId/machines`, async (req, res, next) => {
  const { centerId } = req.params

  try {
    const center = await Center.findByPk(centerId)

    const rfm = await Machine.findAll({
      where: {
        centerId
      },
      include: [
        { model: Center }
      ]
    })

    if (!center) {
      res.sendStatus(404)
    } else {
      res.json(rfm)
    }

  } catch (error) {
    next(error)
  }
})

// GET /api/centros/:centerId
router.get(`/:centerId`, async (req, res, next) => {
  const { centerId } = req.params

  try {
    const center = await Center.findByPk(centerId)

    if (!center) {
      res.sendStatus(404)
    } else {
      res.json(center)
    }
  } catch (error) {
    next(error)
  }
})

