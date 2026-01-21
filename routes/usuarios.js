module.exports = (app) => {
  const usuariosControllers = require("../controllers/usuariosControllers");
  app.get("/usuarios/read/unique", (req, res) => {
    usuariosControllers.returnInfosUsers(app, req, res);
  });
};
