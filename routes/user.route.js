const express = require('express')
const router = express.Router()
const {
    getUsersHandler,
} = require('../controllers/user.controller')


// routes

// get all users -> users list
router.get('/users', getUsersHandler)

module.exports = router