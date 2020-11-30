const express = require('express')
const router = express.Router()

// register controller
const registerController = require('../controllers/registerController')

// destructuring object from controller
const {
	getAllRegister,
	createRegister,
	updateRegister,
	deleteRegister,
} = registerController

router.get('/', getAllRegister)
router.post('/', createRegister)
router.patch('/:typeRound/:id', updateRegister)
router.delete('/:typeRound/:id', deleteRegister)

module.exports = router
