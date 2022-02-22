import * as response from "../helpers/response";
import createUserRequest from "../requests/user/createUserRequest";
import authRequest from "../requests/user/authRequest";
import createContactRequest from "../requests/contact/createContactRequest";
import updateContactRequest from "../requests/contact/updateContactRequest";
import setFavoriteRequest from "../requests/contact/setFavoriteRequest";

/**
 * Checking the request for any validation
 * @async
 * @function validate
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {Promise <any>} res
 */
async function validate(req, res, next) {
  let validated;
  const path = req.route.path;
  const method = Object.keys(req.route.methods)[0];
  const toChoose = `${method} ${path}`;
  switch (toChoose) {
    case "post /sign-up":
      validated = createUserRequest(req.body);
      break;
    case "post /sign-in":
      validated = authRequest(req.body);
      break;
    case "get /":
      break;
    case "get /:id":
      break;
    case "post /":
      validated = createContactRequest(req.body);
      break;
    case "put /:id":
      validated = updateContactRequest(req.body);
      break;
    case "delete /:id":
      break;
    case "post /:id/set-favorite":
      validated = setFavoriteRequest(req.body);
      break;

    default:
      break;
  }
  if (validated && Object.keys(validated).length !== 0) {
    return response.failure(res, 400, validated);
  } else {
    next();
  }
}

export default validate;
