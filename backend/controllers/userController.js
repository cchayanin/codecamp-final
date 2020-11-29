const getAllUser = (req, res) => {
	res.status(200).send('getAllUser')
}

const getUser = (req, res) => {
	res.status(200).send('getUser')
}
const createUser = (req, res) => {
	res.status(200).send('createUser')
}
const updateUser = (req, res) => {
	res.status(200).send('updateUser')
}
const deleteUser = (req, res) => {
	res.status(200).send('deleteUser')
}

module.exports = {
	getAllUser,
	getUser,
	createUser,
	updateUser,
	deleteUser,
}
