const express = require('express')
const router = express.Router()

// register controller
const registerController = require('../controllers/registerController')

// destructuring object from controller
const {
	getAllRegister,
	getAllRegisterHome,
	createRegister,
	updateRegister,
	deleteRegister,
} = registerController

router.get('/', getAllRegister)
router.get('/home', getAllRegisterHome)
router.post('/', createRegister)
router.patch('/:type_round/:id', updateRegister)
router.delete('/:type_round/:id', deleteRegister)

module.exports = router
