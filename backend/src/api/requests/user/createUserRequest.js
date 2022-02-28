import verify, { Joi } from "../../base/requests/baseRequest";

const validateUser = (data) => {
  const rule = {
    name: Joi.string()
      .required()
      .trim()
      .min(5)
      .max(50)
      .pattern(/^[a-zA-Z ]*$/)
      .messages({
        "string.empty": "the field is required",
        "string.pattern.base": "only allows alphabet i.e. a-Z",
        "string.max":
          "length must be less than or equal to {{#limit}} characters long",
        "string.min": "length must be at least {{#limit}} characters long",
      }),
    email: Joi.string().min(5).max(255).required().email().messages({
      "string.empty": "the field is required",
      "string.email": "incorrect email format. Example: example@example.com",
    }),
    password: Joi.string().min(5).max(255).required().messages({
      "string.empty": "the field is required",
      "string.max":
        "length must be less than or equal to {{#limit}} characters long",
      "string.min": "length must be at least {{#limit}} characters long",
    }),
  };
  return verify(data, rule);
};

export default validateUser;
