const store = require("../store/dummy");
const nanoid = require("nanoid");
const auth = require("../auth");
const TABLA = "user";

module.exports = function(injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../store/dummy");
  }
  function list() {
    return store.list(TABLA);
  }
  function get(id) {
    return store.get(TABLA, id);
  }
  async function upsert(body) {
    const user = {
      name: body.name,
      userName: body.userName
    };
    if (body.id) {
      user.id = body.id;
    } else {
      user.id = Math.floor(Math.random() * 10000);
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        userName: body.userName,
        userPassword: body.password
      });
    }
    return store.upsert(TABLA, user);
  }
  return {
    list,
    get,
    upsert
  };
};
