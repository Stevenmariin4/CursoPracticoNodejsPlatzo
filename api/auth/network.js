const express = require("express");
const router = express.Router();
const response = require("../network/response");
const Controller = require("./index");
const bodyparse = require("body-parser");
const app = express();
app.use(bodyparse.json());
/**
 * JSON parameters require a model. This one just has "name"
 * @typedef ReqLogin
 * @property {string} userName.required - el username es requerido - eg: usuario
 * @property {string} password.required - la password es requerido - eg: Qwer.1234
 */
/**
 * This route will respond greetings to name in json request body.
 * @route POST /login
 * @group login - Platzi
 * @param {ReqLogin.model} user.body.required - username or email
 * @returns {object} 200 - Ingreso Correctamente
 * @returns {object} 400 - Datos enviados incorrectos
 * @returns {object} 500 - Error Interno
 * @returns {Error}  default - Unexpected error
 * @headers {integer} 200.X-Rate-Limit - calls per hour allowed by the user
 * @headers {string} 200.X-Expires-After - 	date in UTC when token expires
 * @produces application/json
 * @consumes application/json
 */
router.post("/login", login);

function login(req, res) {
  Controller.login(req.body.userName, req.body.password)
    .then(token => {
      response.succes(req, res, token, 200);
    })
    .catch(err => {
      response.error(req, res, err.message, 400);
    });
}

module.exports = router;
