const db = require('../models')

const getAllRegister = async (req, res) => {
	const registers = await db.Register.findAll({
		include: [db.Person, db.Course],
	})
	res.status(200).send(registers)
}

const createRegister = async (req, res) => {
	// * check record exists.
	const targetRegister = await db.Register.findOne({
		where: {
			type_round: req.body.type_round,
			citizen_id: req.body.citizen_id,
		},
	})

	if (targetRegister) {
		res.status(400).send({ message: 'Register already exists.' })
	} else {
		await db.Register.create({
			...req.body,
		})
		res.status(201).send({ message: 'Register was created' })
	}
}

const updateRegister = async (req, res) => {
	// * check record exists.
	const targetRegister = await db.Register.findOne({
		where: {
			type_round: req.params.type_round,
			citizen_id: req.params.id,
		},
	})

	if (targetRegister) {
		await targetRegister.update({
			...req.body,
		})
		res.status(200).send({ message: 'Updating was success.' })
	} else {
		res.status(404).send({ message: 'Register not found.' })
	}
}
const deleteRegister = async (req, res) => {
	// * check record exists.
	const targetRegister = await db.Register.findOne({
		where: {
			type_round: req.params.type_round,
			citizen_id: req.params.id,
		},
	})

	if (targetRegister) {
		await targetRegister.destroy()
		res.status(204).send()
	} else {
		res.status(404).send({ message: 'Register not found.' })
	}
}

module.exports = {
	getAllRegister,
	createRegister,
	updateRegister,
	deleteRegister,
}
