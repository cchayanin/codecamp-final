const express = require('express')
const router = express.Router()

// routers
const userRouter = require('./userRouter')
const courseRouter = require('./courseRouter')
const personRouter = require('./personRouter')
const registerRouter = require('./registerRouter')
const loginRouter = require('./loginRouter')

// passport authentication
const passport = require('passport')
const authentication = passport.authenticate('jwt', { session: false })

router.use('/users', authentication, userRouter)
router.use('/courses', authentication, courseRouter)
router.use('/persons', authentication, personRouter)
router.use('/registers', authentication, registerRouter)
router.use('/login', loginRouter)

module.exports = router
