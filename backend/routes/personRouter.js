const express = require('express')
const router = express.Router()

// person controller
const personController = require('../controllers/personController')

// destructuring object from controller
const {
	getAllPerson,
	createPerson,
	updatePerson,
	deletePerson,
} = personController

router.get('/', getAllPerson)
router.post('/', createPerson)
router.patch('/:id', updatePerson)
router.delete('/:id', deletePerson)

module.exports = router
