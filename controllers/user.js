var router = require('express').Router()
const passport = require('passport')

var {getcustomorservice, postcustomorService, putCustomorService,deleteCustomorService} = require('../services/users')

router.get('/', passport.authenticate("jwt", {session: false}) ,getcustomorservice)
router.post('/', passport.authenticate("jwt", {session: false}) ,postcustomorService)
router.put('/:id',putCustomorService)
router.delete('/:id', deleteCustomorService)


module.exports = router