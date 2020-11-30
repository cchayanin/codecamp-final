const db = require('../models')

const getAllCourse = async (req, res) => {
	const courses = await db.Course.findAll()
	res.status(200).send(courses)
}

const getCourse = async (req, res) => {
	const course = await db.Course.findOne({
		where: {
			type_round: req.params.id,
		},
	})
	if (course) {
		res.status(200).send(course)
	} else {
		res.status(404).send({ message: 'Course not found.' })
	}
}

const createCourse = async (req, res) => {
	if (await checkNotExistPrimaryKey(req, res)) {
		const newCourse = await db.Course.create({
			...req.body,
		})
		res.status(201).send(newCourse)
	} else {
		res.status(400).send({ message: 'Primary Key already exists.' })
	}
}

const checkNotExistPrimaryKey = async (req, res) => {
	const targetPrimaryKey = req.body.type_round
	const targetCourse = await db.Course.findOne({
		where: {
			type_round: targetPrimaryKey,
		},
	})
	if (targetCourse) return false
	return true
}

const updateCourse = async (req, res) => {
	const targetId = req.params.id
	const targetCourse = await db.Course.findOne({
		where: {
			type_round: targetId,
		},
	})

	if (targetCourse) {
		await targetCourse.update({
			type_round: targetId,
			...req.body,
		})
		res.status(200).send({ message: 'Updating was success.' })
	} else {
		res.status(404).send({ message: 'Course not found.' })
	}
}

const deleteCourse = async (req, res) => {
	const targetId = req.params.id
	const targetCourse = await db.Course.findOne({
		where: {
			type_round: targetId,
		},
	})

	if (targetCourse) {
		await targetCourse.destroy()
		res.status(204).send()
	} else {
		res.status(404).send({ message: 'Course not found.' })
	}
}

module.exports = {
	getAllCourse,
	getCourse,
	createCourse,
	updateCourse,
	deleteCourse,
}
