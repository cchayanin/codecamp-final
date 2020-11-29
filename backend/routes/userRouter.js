//import router
const express = require('express')
const router = express.Router()

//import controller
const userController = require('../controllers/userController')

//destructuring object from controller
const {
	getAllUser,
	getUser,
	createUser,
	updateUser,
	deleteUser,
} = userController

router.get('/', getAllUser)
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router
