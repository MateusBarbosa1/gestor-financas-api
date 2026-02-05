module.exports = (app) => {
  const objetivosControllers = require("../controllers/objetivosControllers.js");
  app.post("/api/objetivos/create", (req, res) => {
    objetivosControllers.createObjetivos(app, req, res);
  });
  app.get("/api/objetivos/read", (req, res) => {
    objetivosControllers.readObjetivos(app, req, res);
  });
};
