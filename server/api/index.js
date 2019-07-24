const router = require('express').Router()
module.exports = router

router.use('/paises', require('./countries')) // countries API
router.use('/centros', require('./centers')) // centers API
router.use('/machines', require('./machines')) // machines API

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})
