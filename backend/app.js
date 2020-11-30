const express = require('express')
const app = express()

//database models
const db = require('./models')

//import routers
const indexRouter = require('./routes/')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)

db.sequelize.sync({ force: false }).then(() => {
	app.listen(8000, () => {
		console.log('Server is running port 8000')
	})
})
