const db = require('../models')
const bcryptjs = require('bcryptjs')

const getAllUser = async (req, res) => {
	const users = await db.User.findAll({
		attributes: ['id', 'username', 'name'],
		where: { is_admin: false },
	})
	res.status(200).send(users)
}

const createUser = async (req, res) => {
	// * check record exists.
	const targetUser = await db.User.findOne({
		where: {
			username: req.body.username,
		},
	})

	if (targetUser) {
		res.status(400).send({ message: 'User already exists.' })
	} else {
		const salt = bcryptjs.genSaltSync(12)
		const hashedPassword = bcryptjs.hashSync(req.body.password, salt)

		await db.User.create({
			...req.body,
			password: hashedPassword,
		})
		res.status(201).send({ message: 'User was created' })
	}
}

const updateUser = async (req, res) => {
	// * check record exists.
	const targetUser = await db.User.findOne({
		where: {
			id: req.params.id,
		},
	})

	if (targetUser) {
		await targetUser.update({
			...req.body,
		})
		res.status(200).send({ message: 'Updating was success.' })
	} else {
		res.status(404).send({ message: 'User was not found.' })
	}
}

const deleteUser = async (req, res) => {
	// * check record exists.
	const targetUser = await db.User.findOne({
		where: {
			id: req.params.id,
		},
	})

	if (targetUser) {
		await targetUser.destroy()
		res.status(204).send()
	} else {
		res.status(404).send({ message: 'User not found.' })
	}
}

module.exports = {
	getAllUser,
	createUser,
	updateUser,
	deleteUser,
}
