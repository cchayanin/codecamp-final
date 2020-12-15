const express = require('express')
const router = express.Router()

// course controller
const courseController = require('../controllers/courseController')

// destructuring object from controller
const {
	getAllCourse,
	createCourse,
	updateCourse,
	deleteCourse,
} = courseController

router.get('/', getAllCourse)
router.post('/', createCourse)
router.patch('/:type_round', updateCourse)
router.delete('/:type_round', deleteCourse)

module.exports = router
