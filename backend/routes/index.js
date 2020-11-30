const express = require('express')
const router = express.Router()

// routers
const userRouter = require('./userRouter')
const courseRouter = require('./courseRouter')
const personRouter = require('./personRouter')
const registerRouter = require('./personRouter')

router.use('/users', userRouter)
router.use('/courses', courseRouter)
router.use('/persons', personRouter)
router.use('/persons', registerRouter)

module.exports = router
