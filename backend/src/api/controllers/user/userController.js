import "express-async-errors";
import * as userService from "../../services/user/userService";
import * as response from "../../helpers/response";
import { pick } from "../../helpers/general";

/**
 * Create new user
 * @function create
 * @param {*} req
 * @param {*} res
 * @return {Promise <string>} token
 */
export async function create(req, res) {
  // Checking if the user already exist or not.
  const checkUser = await userService.hasEmail(req.body.email);
  if (checkUser)
    return response.failure(res, 400, { message: "User already exists" });

  // Creating new user.
  try {
    // Generating Token upon successful creation.
    const token = await userService.create(
      pick(req.body, ["email", "name", "password"])
    );

    return response.successWithHeader(
      res,
      token,
      pick(req.body, ["email", "name"]),
      "User Created Successfully"
    );
  } catch (error) {
    return response.failure(res, 204, { message: "Could not create new user" });
  }
}

/**
 * Login user
 * @function login
 * @param {*} req
 * @param {*} res
 * @return {Promise <string>} token
 */
export async function login(req, res) {
  return userService.login(pick(req.body, ["email", "password"]), res);
}
