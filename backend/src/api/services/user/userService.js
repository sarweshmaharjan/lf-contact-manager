import bcrypt from "bcrypt";
import "express-async-errors";
import userModel from "../../models/user/userModel";
import * as response from "../../helpers/response";

/**
 * To check if the email is present or not in the system.
 * @function hasEmail
 * @param {string} email
 */
export async function hasEmail(email) {
  try {
    /** Check if email exist or not in system */
    const users = await userModel.findOne({ email: email });
    return users;
  } catch (error) {
    throw new Error("User is not valid.");
  }
}

/**
 * Login user.
 * @async
 * @function login
 * @param {object} data
 * @param {object} res
 * @return {Promise <any>} token
 */
export async function login(data, res) {
  try {
    /** Check if email exist or not in system */
    const user = await hasEmail(data.email);
    if (!user) throw new Error("Already exist");

    /** Check if password is correct */
    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) throw new Error("No valid");

    /** Generate token*/
    const token = user.generateAuthToken();

    return response.success(res, token, "User Authenticated");
  } catch (error) {
    return response.failure(res, 400, { message: "Invalid email or password" });
  }
}

/**
 * Create new user
 * @async
 * @function create
 * @param {object} data
 */
export async function create(data) {
  /** Create object with new user information */
  const newUser = await new userModel(data);

  /** hash password */
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(data.password, salt);
  await newUser.save();

  /** token */
  return newUser.generateAuthToken();
}
