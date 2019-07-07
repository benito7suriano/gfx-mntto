const router = require('express').Router()
module.exports = router

router.use('/paises', require('./countries')) // countries API
router.use('/centros', require('./centers')) // centers API
router.use('/techos-maquinas', require('./rollformers-roof')) // roof-rollformers API
router.use('/polin-maquinas', require('./rollformers-ght')) // ght-rollformers API
router.use('/montacargas', require('./forklifts')) // forklifts API

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})
