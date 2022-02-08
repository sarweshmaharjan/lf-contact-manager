const _ = require("lodash");

const ContactService = require("../../services/Contact/ContactService");
const response = require("../../helpers/Response");
const validCreateContact = require("../../validations/Contact/CreateContactRequest");
const validUpdateContact = require("../../validations/Contact/UpdateContactRequest");
const SetFavoriteRequest = require("../../validations/Contact/SetFavoriteRequest");

require("express-async-errors");

async function index(req, res) {
  const contacts = await ContactService.all(req.user._id);
  return response.success(res, contacts, "List of contacts");
}

async function show(req, res) {
    const contact = await ContactService.byId(req.params.id);
    return response.success(res, contact, "Information of one contact");
}

async function create(req, res) {
    req.body._userId=req.user._id; 
    const validated = validCreateContact(req.body);
    if (Object.keys(validated).length!==0)
    return response.failure(res, 400, validated);

    const contact = await ContactService.create(_.pick(req.body, ["name", "phone", "profile_photo","address","email","organization","_userId"]));
    return response.success(res, contact, "New contact created successfully");
}

async function update(req, res) {
   
    const validated = validUpdateContact(req.body);
    if (Object.keys(validated).length!==0)
    return response.failure(res, 400, validated);

    const contact = await ContactService.update(req.params.id, _.pick(req.body, ["name", "phone", "profile_photo","address","email","organization"]));
    return response.success(res, contact, "Contact was updated successfully");
}

async function destroy(req, res) {
    const contact = await ContactService.destroy(req.params.id);
    return response.success(res, contact, "Contact was deleted successfully");
}

async function setFavorite(req,res){
    const validated = SetFavoriteRequest(req.body);
    if (Object.keys(validated).length!==0)
    return response.failure(res, 400, validated);

    const contact = await ContactService.setFavorite(req.params.id,_.pick(req.body, ["isFavorite"]));
    return response.success(res, contact, "You have favorited it");
}

module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;
module.exports.setFavorite = setFavorite;
