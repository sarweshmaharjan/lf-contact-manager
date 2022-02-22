const mongoose = require("mongoose");
const Contact = require("../../models/Contact/ContactModel");
require('express-async-errors');

async function all(userId) {
  try {
    const contacts = await Contact.find({
      _userId:userId
    }).sort({ isFavorite:-1 , name: 1}); 
    return contacts;
  } catch (error) {
    throw new Error("No data present");
  }
}

async function byId(contactId) {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw new Error("Not a valid ID");
  }

  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    throw new Error("No data present");
  }
}

async function create(data) {
  const newContact = Contact(data);
  const result = await newContact.save();
  return result;
}

async function update(contactId, data) {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw new Error("Not a valid ID");
  }
  const result = await Contact.findByIdAndUpdate(contactId, {
    $set: data,
  },{new:true});
  return result;
}
async function destroy(contactId) {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw new Error("Not a valid ID");
  }
  const result = await Contact.findByIdAndRemove(contactId);
  return result;
}

async function setFavorite(contactId,data){
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw new Error("Not a valid ID");
  }
  const result = await Contact.findByIdAndUpdate(contactId, {
    $set: data,
  },{new:true});
  return result;
}

module.exports.all = all;
module.exports.byId = byId;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;
module.exports.setFavorite = setFavorite;
