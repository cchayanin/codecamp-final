const express = require('express')
const router = express.Router()

// user controller
const userController = require('../controllers/userController')

//destructuring object from controller
const { getAllUser, createUser, deleteUser } = userController

router.get('/', getAllUser)
router.post('/', createUser)
router.delete('/:id', deleteUser)

module.exports = router
