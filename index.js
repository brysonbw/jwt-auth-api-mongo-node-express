const express = require("express")
const cors = require('cors')
const helmet = require('helmet')
const connectDB = require('./config/db')
require('dotenv').config()

// mongodb connect
connectDB()

// app
const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use(helmet())

// routers

// auth router
const authRouter = require('./routes/auth.route')
// user router
const userRouter = require('./routes/user.route')


// api

// auth
app.use('/api/auth', authRouter)
// user
app.use('/api', userRouter)



const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
  console.log(`Server GOOD, running on port ${PORT}...`)
})