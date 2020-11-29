const getAllRegister = (req, res) => {
	res.status(200).send('getAllRegister')
}

const getRegister = (req, res) => {
	res.status(200).send('getRegister')
}
const createRegister = (req, res) => {
	res.status(200).send('createRegister')
}
const updateRegister = (req, res) => {
	res.status(200).send('updateRegister')
}
const deleteRegister = (req, res) => {
	res.status(200).send('deleteRegister')
}

module.exports = {
	getAllRegister,
	getRegister,
	createRegister,
	updateRegister,
	deleteRegister,
}
