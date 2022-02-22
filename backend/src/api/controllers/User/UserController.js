const _ = require("lodash");
const bcrypt = require("bcrypt");
require('express-async-errors');

const validateUser = require("../../validations/User/CreateUserRequest");
const authRequest = require("../../validations/User/AuthRequest");
const UserService = require("../../services/User/UserService");
const response = require("../../helpers/Response");

/**
 * Async function to create new user
 * @param {email,name,password} req
 * @param {status,data,message} res
 * @returns json response
 */
async function create(req, res) {
  //Performing Request Validation
  const validated = validateUser(req.body);
  if (Object.keys(validated).length!==0)
    return response.failure(res, 400, validated);

  //Checking if the user already exist or not.
  let checkUser = await UserService.isValid(req.body.email);
  // console.log(checkUser);
  if (checkUser) return response.failure(res, 400,{message: "User already exists"});
  //Creating new user.
  try {
    const newUser = await UserService.create(
      _.pick(req.body, ["email", "name", "password"])
    );

    //Generating Token upon sucessful creation.
    const token = newUser.generateAuthToken();
    return response.successWithHeader(
      res,
      token,
      _.pick(newUser, ["email", "name"]),
      "User Created Successfully"
    );
  } catch (error) {
    return response.failure(res, 204, {message: "Could not create new user"});
  }
}
/**
 *
 * @param {email,password} req
 * @param {status,data,message} res
 * @returns json response
 */
async function login(req, res) {
  //Request validation.
  const validated = authRequest(req.body);
  if (Object.keys(validated).length!==0)
    return response.failure(res, 400, validated);

  //Checking if email exist or not.
  const user = await UserService.isValid(req.body.email);
  if (!user) return response.failure(res, 400, {message: "Invalid email or password"});

  //Checking encrypted password.
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return response.failure(res, 400, {message: "Invalid email or password"});
  }

  //Generating token
  const token = user.generateAuthToken();
  return response.success(res, token, "User Authenticated");
}

module.exports.create = create;
module.exports.login = login;
