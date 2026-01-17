module.exports = (app) => {
  const objetivosControllers = require("../controllers/objetivosControllers.js");
  app.post("/objetivos/create", (req, res) => {
    objetivosControllers.createObjetivos(app, req, res);
  });
  app.get("/objetivos/read", (req, res) => {
    objetivosControllers.readObjetivos(app, req, res);
  });
};
