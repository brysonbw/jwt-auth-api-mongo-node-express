const express = require('express')
const router = express.Router()
const { validator, authValidationResult } = require('../middleware/validator')
const {
    signupHandler,
    loginHandler,
    currentUserHandler
} = require('../controllers/auth.controller')
const { validateToken } = require('../middleware/authenticate')

// routes

// user-> signup
router.post('/signup', validator, authValidationResult, signupHandler)
// user -> login
router.post('/login', loginHandler)
// check auth -> get current user
router.get('/me', validateToken, currentUserHandler )

module.exports = router