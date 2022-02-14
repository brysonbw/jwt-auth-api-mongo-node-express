const User = require("../models/User")
const jwt = require('jsonwebtoken')
require('dotenv').config()

// user -> signup
module.exports.signupHandler = async (req, res) => {
    const { email, username, password } = req.body
    try {
        // check if user email already exist ->
        const userExist =  await User.findOne({ email })
        if(userExist) return res.status(401).json({success: false, error: 'user/account is already in use'}) 

        // create & save user to database
        const user = await User.create({
            email,
            username,
            password
        })

        return res.status(200).json({success: true, message: `${user.username} successfully registered!`})
    } catch (error) {
        console.log(error)
    }
  };


// user -> login
module.exports.loginHandler = async (req, res) => {
    const { email, password } = req.body
    try {
        // check for email and password
        if (!email || !password ) return res.status(400).json({ auth: false, error: 'Email and password are required'})
        
        // check if email === email in database for user
        const user = await User.findOne({ email })
        if (!user) return res.status(401).json({ auth: false, error: "Invalid credentials"})

        // check and compare password with hash password in database
        const isPassValid = await user.matchPassword(password)
        if (!isPassValid) return res.status(401).json({ auth: false, error: "Invalid credentials"})


        // create access token
        const accessToken = jwt.sign(
            { id: user._id,
              username: user.username                       
            },
            `${process.env.ACCESS_SECRET}`, 
            { expiresIn: `${process.env.ACCESS_EXPIRE}` }, // 1 min in seconds
        );

        const userInfo = {
          id:user._id,
          user:user.username
        }
       
        return res.status(200).json({
            auth: true,
            userInfo,
            isLoggedIn: true,
            accessToken: accessToken,
        })

    } catch (error) {
        console.log(error)
    }
  };


  // check auth -> get current user
  module.exports.currentUserHandler = async (req, res) => {
    try {
        res.json(req.user)
    } catch (error) {
        console.log(error)
    }
  };





  