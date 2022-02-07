const Joi = require("joi");

const rules = Joi.object({
  name: Joi.string()
    .required()
    .trim()
    .min(5)
    .max(50)
    .pattern(/^[a-zA-Z ]*$/)
    .messages({
      "string.empty":"the field is required",
      "string.pattern.base": "only allows alphabet i.e. a-Z",
      "string.max":
        "length must be less than or equal to {{#limit}} characters long",
      "string.min":
        "length must be at least {{#limit}} characters long",
    }),
  email: Joi.string().min(5).max(255).email().messages({
    "string.empty":"the field is required",
    "string.email":
      "incorrect email format. Example: example@example.com",
  }),
  password: Joi.string().min(5).max(255).required().messages({
    "string.empty":"the field is required",
    "string.max":
      "length must be less than or equal to {{#limit}} characters long",
    "string.min":
      "length must be at least {{#limit}} characters long",
  }),
}).options({ abortEarly: false });

function validateUser(data) {
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

module.exports = validateUser;
