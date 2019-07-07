const router = require('express').Router()
module.exports = router

router.use('/paises', require('./countries')) // countries API
// router.use('/centros') // centers API
// router.use('/techos-maquinas') // roof-rollformers API
// router.use('/polin-maquinas') // ght-rollformers API
// router.use('/montacargas') // forklifts API

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})
