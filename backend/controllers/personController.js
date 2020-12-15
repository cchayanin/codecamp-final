const db = require('../models')

const getAllPerson = async (req, res) => {
	const persons = await db.Person.findAll()
	res.status(200).send(persons)
}

const createPerson = async (req, res) => {
	// * check record exists.
	const targetPerson = await db.Person.findOne({
		where: {
			citizen_id: req.body.citizen_id,
		},
	})

	if (targetPerson) {
		res.status(400).send({ message: 'Person already exists.' })
	} else {
		await db.Person.create({
			...req.body,
		})
		res.status(201).send({ message: 'Person was created' })
	}
}

const updatePerson = async (req, res) => {
	// * check record exists.
	const targetPerson = await db.Person.findOne({
		where: {
			citizen_id: req.params.id,
		},
	})

	if (targetPerson) {
		await targetPerson.update({
			...req.body,
		})
		res.status(200).send({ message: 'Updating was success.' })
	} else {
		res.status(404).send({ message: 'Person was not found.' })
	}
}
const deletePerson = async (req, res) => {
	// * check record exists.
	const targetPerson = await db.Person.findOne({
		where: {
			citizen_id: req.params.id,
		},
	})

	if (targetPerson) {
		await targetPerson
			.destroy()
			.then(() => res.status(204).send())
			.catch(() => res.status(400).send())
	} else {
		res.status(404).send({ message: 'Person not found.' })
	}
}

module.exports = {
	getAllPerson,
	createPerson,
	updatePerson,
	deletePerson,
}
