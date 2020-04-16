const express = require("express");
const config = require("./config");
const user = require("./user/network");
const auth = require("./auth/network");
const error = require("./network/error");
const bodyparse = require("body-parser");
const morgan = require("morgan");
const app = express();
app.use(bodyparse.json());
app.use(morgan("dev"));
const expressSwagger = require("express-swagger-generator")(app);

let options = {
  swaggerDefinition: {
    info: {
      description: "Curso de platzi nodejs",
      title: "Platzi Server",
      version: "1.0.0",
    },
    host: "localhost:3000",
    basePath: "/api",
    produces: ["application/json"],
    schemes: ["http", "https"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "",
      },
    },
  },
  basedir: __dirname, //app absolute path
  files: ["./user/network.js", "./auth/network.js"], //Path to the API handle folder
};
expressSwagger(options);
//Routes
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use(error);
//inicializar el servidor
app.listen(config.api.port, () => {
  console.log("Api escuchando ne el puerto", config.api.port);
});
