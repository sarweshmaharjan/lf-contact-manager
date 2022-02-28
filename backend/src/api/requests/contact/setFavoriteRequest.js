import verify, { Joi } from "../../base/requests/baseRequest";

/**
 * @function validSetFavorite
 * @param {object} data
 * @return {any}
 */
function validSetFavorite(data) {
  const rule = {
    isFavorite: Joi.boolean().required(),
  };
  return verify(data, rule);
}

export default validSetFavorite;
