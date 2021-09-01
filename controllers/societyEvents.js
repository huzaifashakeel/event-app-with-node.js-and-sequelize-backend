const router = require('express').Router()
const passport = require('passport')

var {addsocietyEventService, getsocietyEvents} = require('../services/societyEvents')
router.get('/', passport.authenticate("jwt", {session: false}), getsocietyEvents)
router.post('/', addsocietyEventService)




module.exports = router