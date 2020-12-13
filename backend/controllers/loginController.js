const db = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
	const { username, password } = req.body
	const targetUser = await db.User.findOne({ where: { username: username } })
	if (!targetUser) {
		res.status(400).send({ message: 'Username or Password is wrong.' })
	} else {
		const isCorrectPassword = bcryptjs.compareSync(
			password,
			targetUser.password,
		)
		if (isCorrectPassword) {
			const payload = {
				name: targetUser.name,
				id: targetUser.id,
				is_admin: targetUser.is_admin,
			}

			const token = jwt.sign(payload, process.env.SECRET_OR_KEY, {
				expiresIn: 7200,
			})
			res.status(200).send({
				token: token,
				message: 'Login successful.',
			})
		} else {
			res.status(400).send({ message: 'Username or Password is wrong.' })
		}
	}
}

module.exports = {
	loginUser,
}
