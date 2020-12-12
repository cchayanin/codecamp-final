const express = require('express')
const router = express.Router()

// register controller
const loginController = require('../controllers/loginController')

// destructuring object from controller
const { loginUser } = loginController

router.post('/', loginUser)

module.exports = router
