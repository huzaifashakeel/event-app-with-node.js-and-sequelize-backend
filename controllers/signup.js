var router = require('express').Router()

var {postuserService, getuserService} = require('../services/auth')
router.post('/', postuserService)
router.get('/', getuserService)

module.exports =  router