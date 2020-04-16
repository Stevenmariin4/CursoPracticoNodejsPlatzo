const reques = require("request");

function createRemoteDb(host, port) {
  const URL = "htttp://" + host + ":" + port;
}
function list(table) {
  req("GET", table);
}

// function get(tabla,id);
// function upsert(tabla,data);
// function query(tabla,query,join );

function req(method, table, data) {
  let url = URL + "/" + table;
  body = "";
  return new Promise((resolve, reject) => {
    request(
      {
        method,
        headers: {
          "content-type": "application/json",
        },
        url,
        body,
      },
      (err, req, body) => {
        if (err) {
          console.error("Error con la base de datos", err);
          return reject(err.message);
        }
        const resp = JSON.parse(body);
        return resolve(resp.body);
      }
    );
  });
}
module.exports = createRemoteDb;
