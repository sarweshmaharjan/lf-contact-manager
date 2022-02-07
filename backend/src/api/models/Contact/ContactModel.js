const mongoose = require("mongoose");

// // DB model: Contact
const Contact = new mongoose.model(
  "Contact",
  new mongoose.Schema({
    _userId:{
      type: Object,
      required:true
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      trim: true,
    },
    phone: {
      type: Array,
      validate: (v) => Array.isArray(v) && Array.length >= 0,
    },
    profile_photo: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      trim: true,
    },
    address: {
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
      maxlength: 50,
      trim: true,
    },
    organization: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      trim: true,
    },
    isFavorite:{
      type:Boolean,
      default:false
    },
    created_at: { type: Date},
    updated_at: { type: Date},
  })
);

module.exports = Contact;
