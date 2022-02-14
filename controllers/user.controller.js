const User = require("../models/User")

// show/get all users -> users list
module.exports.getUsersHandler = async (req, res) => {
    try {
        const users = await User.find({}).select("email").select("username")
        return res.status(200).json({users: users})
    } catch (error) {
        console.log(error)
    }
  };

