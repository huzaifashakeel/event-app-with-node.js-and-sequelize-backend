const router = require("express").Router();
const{postSocietyService, deleteSocietyService, getsocietyService, getMembersocietyService} = require('../services/societies')
const passport = require('passport')

router.get('/:email', passport.authenticate("jwt", {session: false}), getMembersocietyService)
router.get('/', passport.authenticate("jwt", {session: false}), getsocietyService)

router.post('/', passport.authenticate("jwt",{session: false}),postSocietyService)
router.delete('/', passport.authenticate("jwt",{session: false}), deleteSocietyService)


module.exports = router