import * as contactService from "../../services/contact/contactService";
import { pick } from "../../helpers/general";
import * as response from "../../helpers/response";

require("express-async-errors");

/**
 * Get all contact.
 * @function index
 * @async
 * @param {*} req
 * @param {*} res
 * @return {Promise <any>}
 */
export async function index(req, res) {
  const contacts = await contactService.all(req.user._id);
  return response.success(res, contacts, "List of contacts");
}

/**
 * Get specific contact.
 * @function show
 * @async
 * @param {*} req
 * @param {*} res
 * @return {Promise <any>}
 */
export async function show(req, res) {
  const contact = await contactService.byId(req.params.id);
  return response.success(res, contact, "Information of one contact");
}

/**
 * Create new contact.
 * @function create
 * @async
 * @param {*} req
 * @param {*} res
 * @return {Promise <any>}
 */
export async function create(req, res) {
  req.body._userId = req.user._id;
  const contact = await contactService.create(
    pick(req.body, [
      "name",
      "phone",
      "profile_photo",
      "address",
      "email",
      "organization",
      "_userId",
    ])
  );
  return response.success(res, contact, "New contact created successfully");
}

/**
 * Edit contact.
 * @function update
 * @async
 * @param {*} req
 * @param {*} res
 * @return {Promise <any>}
 */
export async function update(req, res) {
  const contact = await contactService.update(
    req.params.id,
    pick(req.body, [
      "name",
      "phone",
      "profile_photo",
      "address",
      "email",
      "organization",
    ])
  );
  return response.success(res, contact, "Contact was updated successfully");
}

/**
 * Delete specific contact.
 * @function destroy
 * @async
 * @param {*} req
 * @param {*} res
 * @return {Promise <any>}
 */
export async function destroy(req, res) {
  const contact = await contactService.destroy(req.params.id);
  return response.success(res, contact, "Contact was deleted successfully");
}

/**
 * Set contact as favorite.
 * @function setFavorite
 * @async
 * @param {*} req
 * @param {*} res
 * @return {Promise <any>}
 */
export async function setFavorite(req, res) {
  const contact = await contactService.setFavorite(
    req.params.id,
    pick(req.body, ["isFavorite"])
  );
  return response.success(res, contact, "You have favorite it");
}
