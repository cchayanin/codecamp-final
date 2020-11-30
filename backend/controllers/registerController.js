const db = require('../models')

const getAllRegister = async (req, res) => {
	const registers = await db.Register.findAll()
	res.status(200).send(registers)
}

const createRegister = async (req, res) => {
	if (await checkNotExistPrimaryKey(req, res)) {
		const newRegister = await db.Register.create({
			...req.body,
		})
		res.status(201).send(newRegister)
	} else {
		res.status(400).send({ message: 'Primary Key already exists.' })
	}
}

const checkNotExistPrimaryKey = async (req, res) => {
	const targetTypeRound = req.body.type_round
	const targetCitizenId = req.body.citizen_id
	const targetRegister = await db.Register.findOne({
		where: {
			type_round: targetTypeRound,
			citizen_id: targetCitizenId,
		},
	})
	if (targetRegister) return false
	return true
}

const updateRegister = async (req, res) => {
	const targetTypeRound = req.params.typeRound
	const targetCitizenId = req.params.id
	const targetRegister = await db.Register.findOne({
		where: {
			type_round: targetTypeRound,
			citizen_id: targetCitizenId,
		},
	})

	if (targetRegister) {
		await targetRegister.update({
			type_round: targetTypeRound,
			citizen_id: targetCitizenId,
			...req.body,
		})
		res.status(200).send({ message: 'Updating was success.' })
	} else {
		res.status(404).send({ message: 'Register not found.' })
	}
}
const deleteRegister = async (req, res) => {
	const targetTypeRound = req.params.typeRound
	const targetCitizenId = req.params.id
	const targetRegister = await db.Register.findOne({
		where: {
			type_round: targetTypeRound,
			citizen_id: targetCitizenId,
		},
	})

	if (targetRegister) {
		await targetRegister.destroy()
		res.status(200).send()
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
