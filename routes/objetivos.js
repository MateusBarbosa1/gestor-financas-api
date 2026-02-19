module.exports = (app) => {
  const objetivosControllers = require("../controllers/objetivosControllers.js");
  app.post("/api/objetivos/create", (req, res) => {
    objetivosControllers.createObjetivos(app, req, res);
  });
  app.get("/api/objetivos/read", (req, res) => {
    objetivosControllers.readObjetivos(app, req, res);
  });
  app.delete("/api/objetivos/delete/:id", (req, res) => {
    objetivosControllers.deleteObjetivos(app, req, res);
  });
  app.put("/api/objetivos/update/:id", (req, res) => {
    objetivosControllers.updateObjetivos(app, req, res);
  });
};
