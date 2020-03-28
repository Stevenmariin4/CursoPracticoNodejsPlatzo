exports.succes = function(req, res, message, status) {
    let statuscode = status || 200;
  res.status(statuscode).send({
    error: false,
    status: status,
    body: message
  });
};

exports.error = function(req, res, message, status) {
    let statuscode = status || 500 
  res.status(statuscode).send({
    error: true,
    status: status,
    body: message
  });
};
