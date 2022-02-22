import Joi from "joi";

const verify = (data, rule) => {
  const rules = Joi.object(rule).options({ abortEarly: false });
  const result = rules.validate(data);
  const mapError = {};
  if (result.error) {
    Object.keys(result.error.details).map(function (key, index) {
      const keyName = result.error.details[key].context.key;
      return (mapError[keyName] = result.error.details[key].message);
    });
  }
  return mapError;
};

export { verify as default, Joi };
