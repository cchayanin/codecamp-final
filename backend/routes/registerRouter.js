//import router
const express = require('express')
const router = express.Router()

//import controller
const registerController = require('../controllers/registerController')

//destructuring object from controller
const {
	getAllRegister,
	getRegister,
	createRegister,
	updateRegister,
	deleteRegister,
} = registerController

router.get('/', getAllRegister)
router.get('/:id', getRegister)
router.post('/', createRegister)
router.put('/:id', updateRegister)
router.delete('/:id', deleteRegister)

module.exports = router
