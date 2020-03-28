const express = require("express");
const router = express.Router();
const response = require("../network/response");
const Controller = require("./index");
const bodyparse = require("body-parser");
const app = express();
app.use(bodyparse.json());
/**
 * This route will respond greetings to name in json request body.
 * @route Get /api/user
 * @group User - Platzi User *
 * @returns {object} 200 -Devuelve un array de usuarios
 * @returns {object} 404 -La lista solicitada no ha sido encontradas
 * @returns {Error}  default - Unexpected error
 * @produces application/json
 * @consumes application/json
 */
router.get("/", list);
/**
 * This route will respond greetings to name in json request body.
 * @route Get /api/user/:id
 * @group User - Platzi User *
 *  @property {string} id.required - el id de la persona es requerido - eg: 1
 * @returns {object} 200 -Devuelve el usuario solicitado
 * @returns {object} 404 -La lista solicitada no ha sido encontradas
 * @returns {object} 500 -el id no viene en el formato esperado
 * @returns {Error}  default - Unexpected error
 * @produces application/json
 * @consumes application/json
 */
router.get("/:id", listUser);
/**
 * JSON parameters require a model. This one just has "name"
 * @typedef ReqUser
 * @property {string} userName.required - el id es requerido - eg: usuario
 * @property {string} name.required - el id es requerido - eg: pepito
 * @property {string} password.required - el id es requerido - eg: Qwer.1234
 */
/**
 * This route will respond greetings to name in json request body.
 * @route POST /api/user
 * @group User - Platzi User
 * @param {ReqUser.model} name.body.required - username or email
 * @returns {object} 201 - Usuario creado exitosamente
 * @returns {object} 400 - Datos enviados incorrectos
 * @returns {object} 500 - Error Interno
 * @returns {Error}  default - Unexpected error
 * @headers {integer} 200.X-Rate-Limit - calls per hour allowed by the user
 * @headers {string} 200.X-Expires-After - 	date in UTC when token expires
 * @produces application/json
 * @consumes application/json
 */
router.post("/", upsert);

function upsert(req, res) {
  Controller.upsert(req.body)
    .then(user => {
      response.success(req, res, user, 201);
    })
    .catch(err => {
      response.error(req, res, err.message, 500);
    });
}
function listUser(req, res) {
  const user = Controller.get(req.params.id)
    .then(user => {
      response.succes(res, res, user, 200);
    })
    .catch(err => {
      response.error(req, res, err.message, 500);
    });
}
function list(req, res) {
  const lista = Controller.list()
    .then(lista => {
      response.succes(req, res, lista, 200);
    })
    .catch(err => {
      response.error(req, res, err.message, 500);
    });
}
module.exports = router;
