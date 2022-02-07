const User = require("../../models/User/UserModel");
require('express-async-errors');
const bcrypt = require("bcrypt");

async function isValid(email) {
  try {
    let users = await User.findOne({ email: email });
    return users;
  } catch (error) {
    throw new Error("User is not valid.");
  }
}
async function create(data) {
  try {
    const newUser = User(data);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(data.password, salt);
    const result = await newUser.save();
    return result;
  } catch (error) {
    throw new Error("New user create fail.");
  }
}

module.exports.isValid = isValid;
module.exports.create = create;
