/**
 * @function success
 * @param {*} res
 * @param {*} data
 * @param {*} message
 * @return {any}
 */
export function success(res, data, message) {
  return res.status(200).send({ status: 200, data: data, message: message });
}

/**
 * @function successWithHeader
 * @param {*} res
 * @param {*} header
 * @param {*} data
 * @param {*} message
 * @return {any}
 */
export function successWithHeader(res, header, data, message) {
  return res
    .status(200)
    .header("x-auth-token", header)
    .header("access-control-expose-headers", "x-auth-token")
    .send({ status: 200, data: data, message: message });
}

/**
 * @function failure
 * @param {*} res
 * @param {*} status
 * @param {*} err
 * @return {any}
 */
export function failure(res, status, err) {
  return res.status(status).send({ status: status, err: err });
}
