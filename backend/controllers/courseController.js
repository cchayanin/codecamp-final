const getAllCourse = (req, res) => {
	res.status(200).send('getAllCourse')
}

const getCourse = (req, res) => {
	res.status(200).send('getCourse')
}
const createCourse = (req, res) => {
	res.status(200).send('createCourse')
}
const updateCourse = (req, res) => {
	res.status(200).send('updateCourse')
}
const deleteCourse = (req, res) => {
	res.status(200).send('deleteCourse')
}

module.exports = {
	getAllCourse,
	getCourse,
	createCourse,
	updateCourse,
	deleteCourse,
}
