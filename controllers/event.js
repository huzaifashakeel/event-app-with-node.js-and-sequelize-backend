const router = require('express').Router()
const passport = require('passport')

const {getallEvents,postEventService, deleteEventService} = require('../services/events')
router.get('/', passport.authenticate("jwt", {session:false}), getallEvents)
router.post('/', passport.authenticate("jwt", {session: false}) ,postEventService)
router.delete('/', passport.authenticate("jwt", {session: false}),deleteEventService)

module.exports = router  