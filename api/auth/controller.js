const auth = require("../token");
const TABLA = "auth";
module.exports = function(injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../store/dummy");
  }

  function upsert(data) {
    const authData = {
      id: data.id
    };
    if (data.userName) {
      authData.username = data.userName;
    }

    if (data.userPassword) {
      authData.password = data.userPassword;
    }

    return store.upsert(TABLA, authData);
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username });
    if (data.length == 0) {
      throw new Error("Datos No Encontrados");
    } else {
      if (data[0].password === password) {
        return auth.sign(data)
      } else {
        throw new Error("Informacion Invalida");
      }
    }

    return data;
  }

  return {
    upsert,
    login
  };
};
