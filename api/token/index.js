const jwt = require("jsonwebtoken");
function sign(data) {
  return jwt.sign(data[0], "secretro");
}
module.exports = {
    sign
}
