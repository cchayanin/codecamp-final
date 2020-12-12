require('dotenv').config()
require('./config/passport/passport')

const express = require('express')
const app = express()
const cors = require('cors')
const bcryptjs = require('bcryptjs')

const db = require('./models')
const indexRouter = require('./routes/')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)

db.sequelize.sync({ force: true }).then(async () => {
	const salt = bcryptjs.genSaltSync(12)
	const hashedPassword = bcryptjs.hashSync(process.env.PASSWORD, salt)
	try {
		await db.User.create({
			username: 'admin',
			password: hashedPassword,
			name: 'Super Admin',
			is_admin: true,
		})
	} catch (error) {}

	app.listen(process.env.PORT, () => {
		console.log(`Server is running port ${process.env.PORT}`)
	})
})
