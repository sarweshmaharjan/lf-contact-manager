import mongoose from "mongoose";
import "express-async-errors";
import contactModel from "../../models/contact/contactModel";

/**
 * Returns all contact present in database.
 * @function all
 * @async
 * @param {string} userId
 * @return {Promise <object>} contact
 */
export async function all(userId) {
  try {
    const contacts = await contactModel
      .find({
        _userId: userId,
      })
      .sort({ isFavorite: -1, name: 1 });
    return contacts;
  } catch (error) {
    throw new Error("No data present");
  }
}

/**
 * Returns specific contact by contact id from database.
 * @function byId
 * @async
 * @param {string} contactId
 * @return {Promise <object>} contact
 */
export async function byId(contactId) {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw new Error("Not a valid ID");
  }

  try {
    const contact = await contactModel.findById(contactId);
    return contact;
  } catch (error) {
    throw new Error("No data present");
  }
}

/**
 * Create new contact.
 * @function create
 * @async
 * @param {object} data
 * @return {Promise <object>} contact
 */
export async function create(data) {
  const newContact = contactModel(data);
  const result = await newContact.save();
  return result;
}

/**
 * Update contact.
 * @function update
 * @async
 * @param {string} contactId
 * @param {object} data
 * @return {Promise <object>} contact
 */
export async function update(contactId, data) {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw new Error("Not a valid ID");
  }
  const result = await contactModel.findByIdAndUpdate(
    contactId,
    {
      $set: data,
    },
    { new: true }
  );
  return result;
}

/**
 * Delete contact.
 * @function destroy
 * @async
 * @param {string} contactId
 * @return {Promise <object>} contact
 */
export async function destroy(contactId) {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw new Error("Not a valid ID");
  }
  const result = await contactModel.findByIdAndRemove(contactId);
  return result;
}

/**
 * Set any contact as a favorite.
 * @function setFavorite
 * @async
 * @param {string} contactId
 * @param {object} data
 * @return {Promise <object>} contact
 */
export async function setFavorite(contactId, data) {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw new Error("Not a valid ID");
  }
  const result = await contactModel.findByIdAndUpdate(
    contactId,
    {
      $set: data,
    },
    { new: true }
  );
  return result;
}
