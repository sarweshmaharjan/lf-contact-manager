const Joi = require("joi");

const rules = Joi.object({
  isFavorite: Joi.boolean().required(),
}).options({ abortEarly: false });

function validCreateContact(data) {
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

module.exports = validCreateContact;
