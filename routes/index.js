var router = require('express').Router()

router.use('/api', require('./apis/index'))


module.exports = router