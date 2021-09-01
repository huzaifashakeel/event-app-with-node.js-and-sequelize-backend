const router = require('express').Router()
const passport = require('passport')

var {addorcheckEventMemberService, geteventMembers} = require('../services/eventMember')
router.get('/', passport.authenticate("jwt", {session: false}), geteventMembers)
router.post('/', passport.authenticate("jwt", {session: false}), addorcheckEventMemberService)



module.exports = router