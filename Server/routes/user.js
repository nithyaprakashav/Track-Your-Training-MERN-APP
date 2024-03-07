const express = require('express')
const router = express.Router()
const {signUpUser , loginUser} = require('../Controllers/UserController')
//login route
router.post('/login', loginUser)




//sign up route
router.post('/signup',signUpUser)


module.exports = router