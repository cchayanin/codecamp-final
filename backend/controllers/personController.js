const getAllPerson = (req, res) => {
	res.status(200).send('getAllPerson')
}

const getPerson = (req, res) => {
	res.status(200).send('getPerson')
}
const createPerson = (req, res) => {
	res.status(200).send('createPerson')
}
const updatePerson = (req, res) => {
	res.status(200).send('updatePerson')
}
const deletePerson = (req, res) => {
	res.status(200).send('deletePerson')
}

module.exports = {
	getAllPerson,
	getPerson,
	createPerson,
	updatePerson,
	deletePerson,
}
