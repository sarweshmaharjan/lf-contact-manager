function success(res, data, message) {
  return res.status(200).send({ status: 200, data: data, message: message });
}

function successWithHeader(res, header, data, message) {
  return res
    .status(200)
    .header("x-auth-token", header)
    .header("access-control-expose-headers","x-auth-token")
    .send({ status: 200, data: data, message: message });
}

function failure(res, status, err) {
  return res.status(status).send({ status: status, err: err });
}

module.exports.success = success;
module.exports.successWithHeader = successWithHeader;
module.exports.failure = failure;
