const db = require('../models')

const getAllCourse = async (req, res) => {
	const courses = await db.Course.findAll()
	res.status(200).send(courses)
}

const createCourse = async (req, res) => {
	// * check record exists.
	const targetCourse = await db.Course.findOne({
		where: {
			type_round: req.body.type_round,
		},
	})

	if (targetCourse) {
		res.status(400).send({ message: 'Course already exists.' })
	} else {
		await db.Course.create({
			...req.body,
		})
		res.status(201).send({ message: 'Course was created' })
	}
}

const updateCourse = async (req, res) => {
	// * check record exists.
	const targetCourse = await db.Course.findOne({
		where: {
			type_round: req.params.type_round,
		},
	})

	if (targetCourse) {
		await targetCourse.update({
			...req.body,
		})
		res.status(200).send({ message: 'Updating was success.' })
	} else {
		res.status(404).send({ message: 'Course was not found.' })
	}
}

const deleteCourse = async (req, res) => {
	// * check record exists.
	const targetCourse = await db.Course.findOne({
		where: {
			type_round: req.params.type_round,
		},
	})

	if (targetCourse) {
		await targetCourse
			.destroy()
			.then(() => res.status(204).send())
			.catch(() => res.status(400).send())
	} else {
		res.status(404).send({ message: 'Course was not found.' })
	}
}

module.exports = {
	getAllCourse,
	createCourse,
	updateCourse,
	deleteCourse,
}
