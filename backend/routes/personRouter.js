//import router
const express = require('express')
const router = express.Router()

//import controller
const personController = require('../controllers/personController')

//destructuring object from controller
const {
	getAllPerson,
	getPerson,
	createPerson,
	updatePerson,
	deletePerson,
} = personController

router.get('/', getAllPerson)
router.get('/:id', getPerson)
router.post('/', createPerson)
router.put('/:id', updatePerson)
router.delete('/:id', deletePerson)

module.exports = router
