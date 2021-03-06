const Joi = require("joi");

const rules = Joi.object({
  name: Joi.string()
    .trim()
    .min(5)
    .max(50)
    .pattern(/^[a-zA-Z ]*$/)
    .messages({
      "string.empty":"the field is required",
      "string.pattern.base": "only allows alphabet i.e. a-Z",
      "string.max":
        "length must be less than or equal to {{#limit}} characters long",
      "string.min": "length must be at least {{#limit}} characters long",
    }),
  phone: Joi.array()
    .items(
      Joi.object({
        home: Joi.string().min(7).max(10).pattern(/^\d+$/),
        mobile: Joi.string().min(7).max(10).pattern(/^\d+$/),
        work: Joi.string().min(7).max(10).pattern(/^\d+$/),
      }).min(1)
    )
    .messages({
      "string.empty":"the field is required",
      "object.min": "At least 1 Phone number needs to be present",
      "string.pattern.base": "only allows numeric i.e. 0-9",
      "string.max":
        "length must be less than or equal to {{#limit}} characters long",
      "string.min": "length must be at least {{#limit}} characters long",
    }),
  profile_photo: Joi.string(),
  address: Joi.string().allow(null, '')
    .max(100)
    .pattern(/^[a-zA-Z ,0-9]*$/, "string")
    .trim()
    .messages({
      "string.empty":"the field is required",
      "string.pattern.base": "only allows alphanumber i.e. a-Z, 0-9 and commas",
      "string.max":
        "length must be less than or equal to {{#limit}} characters long",
    }),
  email: Joi.string().allow(null, '').email().messages({
    "string.empty":"the field is required",
    "string.email": "incorrect email format. Example: example@example.com",
  }),
  organization: Joi.string().allow(null, '')
    .max(100)
    .pattern(/^[a-zA-Z0-9 ]*$/)
    .trim()
    .messages({
      "string.empty":"the field is required",
      "string.pattern.base": "only allows alphanumber i.e. a-Z and 0-9",
      "string.max":
        "length must be less than or equal to {{#limit}} characters long",
    }),
}).options({ abortEarly: false });

function validUpdateContact(data) {
  const result = rules.validate(data);
  let mapError = {};
  if (result.error) {
    Object.keys(result.error.details).map(function (key, index) {
      let keyName = result.error.details[key].context.key;
      return (mapError[keyName] = result.error.details[key].message);
    });
  }
  return mapError;
}

module.exports = validUpdateContact;
