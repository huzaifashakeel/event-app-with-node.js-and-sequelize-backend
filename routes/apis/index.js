var router = require('express').Router()

router.use('/signup', require('../../controllers/signup'))
router.use('/user', require('../../controllers/user'))
router.use('/societies', require('../../controllers/society'))
router.use('/events',require('../../controllers/event'))
router.use('/eventMembers', require('../../controllers/eventMembers'))
router.use('/SocietyMembers', require('../../controllers/SocietyMembers'))
router.use('/SocietyEvents',require('../../controllers/societyEvents'))


module.exports = router