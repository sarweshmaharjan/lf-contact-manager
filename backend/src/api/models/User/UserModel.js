const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      trim: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique:true,
      },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
  })

  userSchema.methods.generateAuthToken= function(){
    return jwt.sign({_id:this._id,email:this.email,name:this.name},process.env.jwtPrivateKey);
  }
// DB model: Contact
const User = new mongoose.model(
  "User",
  userSchema
);

module.exports = User;
