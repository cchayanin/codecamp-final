const db = require('../models')

const getAllPerson = async (req, res) => {
	const persons = await db.Person.findAll()
	res.status(200).send(persons)
}

const getPerson = async (req, res) => {
	const person = await db.Person.findOne({
		where: {
			citizen_id: req.params.id,
		},
	})
	if (person) {
		res.status(200).send(person)
	} else {
		res.status(404).send({ message: 'Person not found.' })
	}
}
const createPerson = async (req, res) => {
	if (await checkNotExistPrimaryKey(req, res)) {
		const newPerson = await db.Person.create({
			...req.body,
		})
		res.status(201).send(newPerson)
	} else {
		res.status(400).send({ message: 'Primary Key already exists.' })
	}
}

const checkNotExistPrimaryKey = async (req, res) => {
	const targetPrimaryKey = req.body.citizen_id
	const targetPerson = await db.Person.findOne({
		where: {
			citizen_id: targetPrimaryKey,
		},
	})
	if (targetPerson) return false
	return true
}

const updatePerson = async (req, res) => {
	const targetId = req.params.id
	const targetPerson = await db.Person.findOne({
		where: {
			citizen_id: targetId,
		},
	})

	if (targetPerson) {
		await targetPerson.update({
			citizen_id: targetId,
			...req.body,
		})
		res.status(200).send({ message: 'Updating was success.' })
	} else {
		res.status(404).send({ message: 'Person not found.' })
	}
}
const deletePerson = async (req, res) => {
	const targetId = req.params.id
	const targetPerson = await db.Person.findOne({
		where: {
			type_round: targetId,
		},
	})

	if (targetPerson) {
		await targetPerson.destroy()
		res.status(200).send()
	} else {
		res.status(404).send({ message: 'Person not found.' })
	}
}

module.exports = {
	getAllPerson,
	getPerson,
	createPerson,
	updatePerson,
	deletePerson,
}
