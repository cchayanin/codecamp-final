const express = require('express')
const app = express()

// router
const userRouter = require('./routes/userRouter')
const courseRouter = require('./routes/courseRouter')
const personRouter = require('./routes/personRouter')
const registerRouter = require('./routes/personRouter')

app.use('/users', userRouter)
app.use('/course', courseRouter)
app.use('/persons', personRouter)
app.use('/persons', registerRouter)

app.listen(8000, () => {
	console.log('Server is running port 8000')
})
