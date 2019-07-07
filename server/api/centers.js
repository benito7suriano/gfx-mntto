const router = require('express').Router()
const { Center, RollformerRoof, RollformerGHT, Forklift } = require('../db')
module.exports = router

// GET /api/centros
router.get('/', async (req,res,next) => {
  try {
    const centers = await Center.findAll()
    res.json(centers)
  } catch (error) { next(err) }
})

// GET /api/centros/:centroId
router.get(`/:centroId`, async (req, res, next) => {
  const { centroId } = req.params

  try {
    const center = await Center.findByPk(centroId)

    if(!center) {
      res.sendStatus(404)
    } else {
      res.json(center)
    }
  } catch (error) {
    next(error)
  }
})

// GET /api/centers/:centerId/roof-rollformer
router.get(`/:centerId/roof-rollformer`, async (req, res, next) => {
  const { centerId } = req.params

  try {
    const rfm = await RollformerRoof.findOne({
      where: {
        centerId: centerId
      },
      include: [{
        model: Center
      }]
    })

    if(!rfm) {
      res.sendStatus(404)
    } else {
      res.json(rfm)
    }

  } catch (error) {
    next(error)
  }
})

// GET /api/centers/:centerId/roof-rollformer
router.get(`/:centerId/ght-rollformer`, async (req, res, next) => {
  const { centerId } = req.params

  try {
    const rfm = await RollformerGHT.findOne({
      where: {
        centerId: centerId
      },
      include: [{
        model: Center
      }]
    })

    if(!rfm) {
      res.sendStatus(404)
    } else {
      res.json(rfm)
    }

  } catch (error) {
    next(error)
  }
})

// GET /api/centers/:centerId/forklift
router.get(`/:centerId/forklift`, async (req, res, next) => {
  const { centerId } = req.params

  try {
    const rfm = await Forklift.findOne({
      where: {
        centerId: centerId
      },
      include: [{
        model: Center
      }]
    })

    if(!rfm) {
      res.sendStatus(404)
    } else {
      res.json(rfm)
    }

  } catch (error) {
    next(error)
  }
})
