import verify, { Joi } from "../../base/requests/baseRequest";

/**
 * @function validCreateContact
 * @param {object} data
 * @return {any}
 */
function validCreateContact(data) {
  const rule = {
    name: Joi.string()
      .required()
      .trim()
      .min(5)
      .max(50)
      .pattern(/^[a-zA-Z ]*$/)
      .messages({
        "string.empty": "the field is required",
        "string.pattern.base": " only allows alphabet i.e. a-Z",
        "string.max":
          "length must be less than or equal to {{#limit}} characters long",
        "string.min": " length must be at least {{#limit}} characters long",
      }),
    phone: Joi.array()
      .items(
        Joi.object({
          home: Joi.string().min(7).max(10).pattern(/^\d+$/),
          mobile: Joi.string().min(7).max(10).pattern(/^\d+$/),
          work: Joi.string().min(7).max(10).pattern(/^\d+$/),
        }).min(1)
      )
      .required()
      .messages({
        "string.empty": "the field is required",
        "object.min": "At least 1 Phone number needs to be present",
        "string.pattern.base": "only allows numeric i.e. 0-9",
        "string.max":
          "length must be less than or equal to {{#limit}} characters long",
        "string.min": "length must be at least {{#limit}} characters long",
      }),
    profile_photo: Joi.string()
      .required()
      .messages({ "string.empty": "the field is required" }),
    address: Joi.string()
      .min(5).allow(null, '')
      .max(100)
      .pattern(/^[a-zA-Z ,0-9]*$/, "string")
      .trim()
      .messages({
        "string.empty": "the field is required",
        "string.pattern.base":
          "only allows alphanumber i.e. a-Z, 0-9 and commas",
        "string.max":
          "length must be less than or equal to {{#limit}} characters long",
        "string.min": "length must be at least {{#limit}} characters long",
      }),
    email: Joi.string().allow(null, '').email().messages({
      "string.email": "incorrect email format. Example: example@example.com",
      "string.empty": "the field is required",
    }),
    organization: Joi.string()
      .min(5).allow(null, '')
      .max(100)
      .pattern(/^[a-zA-Z0-9 ]*$/)
      .trim()
      .messages({
        "string.empty": "the field is required",
        "string.pattern.base": "only allows alphanumber i.e. a-Z and 0-9",
        "string.max":
          "length must be less than or equal to {{#limit}} characters long",
        "string.min": "length must be at least {{#limit}} characters long",
      }),
  };
  return verify(data, rule);
}

export default validCreateContact;
