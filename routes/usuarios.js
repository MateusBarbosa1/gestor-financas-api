module.exports = (app) => {
  const usuariosControllers = require("../controllers/usuariosControllers");
  app.get("/api/usuarios/read/unique", (req, res) => {
    usuariosControllers.returnInfosUsers(app, req, res);
  });
  app.patch("/api/usuarios/update", (req, res) => {
    usuariosControllers.updateUsuario(app, req, res);
  });
};
