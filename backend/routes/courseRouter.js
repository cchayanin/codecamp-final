const express = require('express')
const router = express.Router()

// course controller
const courseController = require('../controllers/courseController')

// destructuring object from controller
const {
	getAllCourse,
	getCourse,
	createCourse,
	updateCourse,
	deleteCourse,
} = courseController

router.get('/', getAllCourse)
router.get('/:id', getCourse)
router.post('/', createCourse)
router.put('/:id', updateCourse)
router.delete('/:id', deleteCourse)

module.exports = router
