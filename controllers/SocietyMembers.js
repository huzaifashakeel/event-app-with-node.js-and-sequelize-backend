const router = require('express').Router()
const passport = require('passport')

var {addsocietyMemberService, getsocietyMembers, getmemberSocities} = require('../services/societyMember')

router.get('/', passport.authenticate("jwt", {session: false}), getsocietyMembers)
router.get('/:userEmail' , getmemberSocities)
router.post('/', passport.authenticate("jwt",{session: false}) , addsocietyMemberService)



module.exports = router