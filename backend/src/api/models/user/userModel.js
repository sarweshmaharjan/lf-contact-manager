import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { GENERAL } from "../../config/config";

/**
 * mongoose User Schema
 */
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
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
});

/**
 * mongoose User Schema
 * @function generateAuthToken
 * @return {string} token
 */
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, name: this.name },
    GENERAL.JWT_PRIVATE_KEY
  );
};

/**
 * Generate model for User.
 */
const User = mongoose.model("User", userSchema);

export default User;
