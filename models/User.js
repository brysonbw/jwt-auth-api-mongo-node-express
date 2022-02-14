const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
  })

  // hash password
  UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (error) {
      return next(error);
    }
  });

  // compare hash password w/user entered password
  UserSchema.methods.matchPassword = async function(password) {
      return await bcrypt.compare(password, this.password)
  }

const User = mongoose.model("User", UserSchema)
module.exports = User